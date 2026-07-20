#!/usr/bin/env bash
#
# Manage a local Couchbase for running the examples.
#
#   ./scripts/couchbase.sh up     # reuse a reachable Couchbase, else start a container
#   ./scripts/couchbase.sh down   # remove the container this script created
#
# If a Couchbase is already reachable at $CB_HOST:8091 (your own install, an
# existing container, etc.) this script will NOT create or modify a container —
# it only ensures the target bucket exists. Override connection details via env:
#
#   CB_HOST (localhost)  CB_USER (Administrator)  CB_PASS (password)
#   CB_BUCKET (test)     CB_CONTAINER (couchbase) CB_IMAGE (couchbase:community)
#
set -euo pipefail

CB_HOST="${CB_HOST:-localhost}"
CB_USER="${CB_USER:-Administrator}"
CB_PASS="${CB_PASS:-password}"
CB_BUCKET="${CB_BUCKET:-test}"
CB_CONTAINER="${CB_CONTAINER:-couchbase}"
CB_IMAGE="${CB_IMAGE:-couchbase:community}"

MGMT="http://${CB_HOST}:8091"
QUERY="http://${CB_HOST}:8093"

http_code() { curl -s -o /dev/null -w '%{http_code}' "$1" 2>/dev/null || true; }

reachable() { [ "$(http_code "$MGMT/ui/index.html")" = "200" ]; }

wait_reachable() {
  echo "waiting for Couchbase management UI at $MGMT ..."
  for _ in $(seq 1 90); do reachable && return 0; sleep 1; done
  echo "ERROR: Couchbase did not become reachable at $MGMT" >&2
  return 1
}

ensure_container() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "ERROR: docker not found and no Couchbase reachable at $MGMT" >&2
    echo "       Install Docker, or point CB_HOST at an existing cluster." >&2
    exit 1
  fi
  if docker ps --format '{{.Names}}' | grep -qx "$CB_CONTAINER"; then
    echo "container '$CB_CONTAINER' already running"
  elif docker ps -a --format '{{.Names}}' | grep -qx "$CB_CONTAINER"; then
    echo "starting existing container '$CB_CONTAINER'"
    docker start "$CB_CONTAINER" >/dev/null
  else
    echo "creating container '$CB_CONTAINER' from $CB_IMAGE"
    docker run -d --name "$CB_CONTAINER" \
      -p 8091-8096:8091-8096 -p 11210-11211:11210-11211 "$CB_IMAGE" >/dev/null
  fi
  wait_reachable
}

# Cluster init is idempotent: re-running against a configured cluster is a no-op
# (already-configured endpoints return errors, which we ignore).
init_cluster() {
  curl -s -X POST "$MGMT/pools/default" -d memoryQuota=512 -d indexMemoryQuota=512 >/dev/null 2>&1 || true
  curl -s -X POST "$MGMT/node/controller/setupServices" -d services=kv%2Cn1ql%2Cindex >/dev/null 2>&1 || true
  curl -s -X POST "$MGMT/settings/web" -d port=8091 -d username="$CB_USER" -d password="$CB_PASS" >/dev/null 2>&1 || true
}

ensure_bucket() {
  if curl -s -u "$CB_USER:$CB_PASS" "$MGMT/pools/default/buckets/$CB_BUCKET" \
       | grep -q "\"name\":\"$CB_BUCKET\""; then
    echo "bucket '$CB_BUCKET' already exists"
  else
    echo "creating bucket '$CB_BUCKET'"
    curl -s -u "$CB_USER:$CB_PASS" -X POST "$MGMT/pools/default/buckets" \
      -d name="$CB_BUCKET" -d bucketType=couchbase -d ramQuota=256 -d flushEnabled=1 >/dev/null
  fi
  echo "waiting for bucket '$CB_BUCKET' to be healthy ..."
  for _ in $(seq 1 60); do
    if curl -s -u "$CB_USER:$CB_PASS" "$MGMT/pools/default/buckets/$CB_BUCKET" \
         | grep -q '"status":"healthy"'; then return 0; fi
    sleep 1
  done
  echo "WARNING: bucket '$CB_BUCKET' not reported healthy yet; continuing" >&2
}

# A primary index is optional (examples use USE KEYS), but handy for ad-hoc N1QL.
ensure_primary_index() {
  for _ in $(seq 1 30); do [ "$(http_code "$QUERY/admin/ping")" = "200" ] && break; sleep 1; done
  curl -s -u "$CB_USER:$CB_PASS" "$QUERY/query/service" \
    --data-urlencode "statement=CREATE PRIMARY INDEX IF NOT EXISTS ON \`$CB_BUCKET\`._default._default" \
    >/dev/null 2>&1 || true
}

cmd_up() {
  if reachable; then
    echo "Couchbase already reachable at $MGMT — reusing it (not touching Docker)"
  else
    ensure_container
    init_cluster
  fi
  ensure_bucket
  ensure_primary_index
  echo "Couchbase ready at $MGMT (user: $CB_USER, bucket: $CB_BUCKET)"
}

cmd_down() {
  if command -v docker >/dev/null 2>&1 && docker ps -a --format '{{.Names}}' | grep -qx "$CB_CONTAINER"; then
    docker rm -f "$CB_CONTAINER" >/dev/null
    echo "removed container '$CB_CONTAINER'"
  else
    echo "no container '$CB_CONTAINER' to remove"
  fi
}

case "${1:-}" in
  up)   cmd_up ;;
  down) cmd_down ;;
  *)    echo "usage: $0 {up|down}" >&2; exit 2 ;;
esac
