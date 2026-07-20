#!/usr/bin/env bash
#
# Run every example end-to-end against a Couchbase and report pass/fail.
# Assumes ./xk6-couchbase is built and Couchbase is up (see couchbase.sh).
#
# Connection details come from env (with the same defaults as couchbase.sh):
#   CB_HOST CB_USER CB_PASS CB_BUCKET
#
set -uo pipefail

BIN="${BIN:-./xk6-couchbase}"
EX_DIR="${EX_DIR:-examples}"

CB_HOST="${CB_HOST:-localhost}"
CB_USER="${CB_USER:-Administrator}"
CB_PASS="${CB_PASS:-password}"
CB_BUCKET="${CB_BUCKET:-test}"

if [ ! -x "$BIN" ]; then
  echo "ERROR: $BIN not found or not executable. Run 'make build' first." >&2
  exit 1
fi

# Quick, self-contained examples. load-sequential-data.js is excluded: it bulk
# loads 100k docs (10 VUs x 10k iterations) and is meant to be run on its own.
EXAMPLES=(
  test-insert.js
  test-insertbatch.js
  test-upsert.js
  test-findone.js
  test-find.js
  test-new-with-conn-per-vu.js
  test-new-with-shared-conn.js
)

fail=0
for f in "${EXAMPLES[@]}"; do
  out=$("$BIN" run --quiet --iterations 1 --vus 1 \
        -e "CB_HOST=$CB_HOST" -e "CB_USER=$CB_USER" -e "CB_PASS=$CB_PASS" -e "CB_BUCKET=$CB_BUCKET" \
        "$EX_DIR/$f" 2>&1)
  if echo "$out" | grep -qiE "level=error|GoError|panic"; then
    echo "FAIL  $f"
    echo "$out" | grep -iE "level=error|GoError|panic" | head -2 | sed 's/^/        /'
    fail=1
  else
    echo "PASS  $f"
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "All examples passed."
else
  echo "Some examples failed." >&2
fi
exit $fail
