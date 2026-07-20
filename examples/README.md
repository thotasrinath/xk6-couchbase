# Running the examples

Every script here is self-contained and independently executable: the read /
query examples seed their own document (via an idempotent `upsert`) before
reading it, so you can run any single example against a fresh bucket.

## Quick start (recommended)

From the repository root, one command builds the binary, ensures a local
Couchbase is up, and runs every example end-to-end:

```bash
make validate
```

It is safe to re-run. Related targets:

```bash
make couchbase-up     # start & initialize a local Couchbase (or reuse one)
make couchbase-down   # remove the container that couchbase-up created
```

### Using an existing Couchbase

`make validate` / `make couchbase-up` first check whether a Couchbase is already
reachable at `CB_HOST:8091`:

- **Already reachable** (your own install, an existing container, a remote
  cluster): it is reused as-is — Docker is never touched. The script only makes
  sure the target bucket exists.
- **Not reachable**: a `couchbase:community` Docker container is created and
  initialized automatically (requires Docker).

Point it at any cluster and override credentials on the command line:

```bash
make validate CB_HOST=10.0.0.5 CB_USER=admin CB_PASS=secret CB_BUCKET=test
```

The rest of this document explains the same steps manually, if you'd rather not
use `make`.

## 1. Build the k6 binary with the extension

The system `k6` cannot run these (it tries to auto-provision `k6/x/couchbase`
from the public registry and fails). Build a custom binary that has the
extension linked in:

```bash
# from the repository root
make build
# or, directly:
xk6 build --output xk6-couchbase --with github.com/thotasrinath/xk6-couchbase=.
```

This produces `./xk6-couchbase`, used in the commands below.

## 2. Start a local Couchbase

Using Docker:

```bash
docker run -d --name couchbase \
  -p 8091-8096:8091-8096 \
  -p 11210-11211:11210-11211 \
  couchbase:community

# wait until the management UI responds (a few seconds)
until curl -s -o /dev/null -w '%{http_code}' http://localhost:8091/ui/index.html | grep -q 200; do sleep 1; done
```

Initialize the cluster (KV + Query + Index services) and create the `test`
bucket. Admin credentials below are `Administrator` / `password`:

```bash
CB=http://localhost:8091
ADMIN=Administrator
PASS=password

# memory quotas + services
curl -s -X POST $CB/pools/default -d memoryQuota=512 -d indexMemoryQuota=512
curl -s -X POST $CB/node/controller/setupServices -d services=kv%2Cn1ql%2Cindex
# admin credentials
curl -s -X POST $CB/settings/web -d port=8091 -d username=$ADMIN -d password=$PASS
# create the 'test' bucket
curl -s -u $ADMIN:$PASS -X POST $CB/pools/default/buckets \
  -d name=test -d bucketType=couchbase -d ramQuota=256 -d flushEnabled=1
```

> Note: Couchbase forbids `<` and `>` in usernames, so the `<username>`
> placeholder in the scripts can never be a real user — it must be overridden
> (see below). The password may contain those characters.

The `test-find.js` example uses `USE KEYS`, which is a key lookup through the
query service and needs no index. If you want to run open-ended N1QL queries of
your own, also create a primary index:

```bash
curl -s -u Administrator:password http://localhost:8093/query/service \
  --data-urlencode 'statement=CREATE PRIMARY INDEX ON `test`._default._default'
```

## 3. Configure credentials

Every example reads connection settings from environment variables, falling back
to placeholders if unset:

| Variable        | Default       | Meaning                  |
| --------------- | ------------- | ------------------------ |
| `CB_HOST`       | `localhost`   | Couchbase host           |
| `CB_USER`       | `<username>`  | Username (must override) |
| `CB_PASS`       | `<password>`  | Password (must override) |
| `CB_BUCKET`     | `test`        | Bucket                   |
| `CB_SCOPE`      | `_default`    | Scope                    |
| `CB_COLLECTION` | `_default`    | Collection               |

Pass them with `-e`:

```bash
./xk6-couchbase run -e CB_USER=Administrator -e CB_PASS=password examples/test-findone.js
```

## 4. Run them all

```bash
cd "$(git rev-parse --show-toplevel)"

for f in examples/test-insert.js \
         examples/test-insertbatch.js \
         examples/test-upsert.js \
         examples/test-findone.js \
         examples/test-find.js \
         examples/test-new-with-conn-per-vu.js \
         examples/test-new-with-shared-conn.js; do
  echo "=== $f ==="
  ./xk6-couchbase run -e CB_USER=Administrator -e CB_PASS=password "$f"
done
```

`load-sequential-data.js` is intentionally left out of the loop above: it bulk
loads 100,000 documents (10 VUs × 10,000 iterations). Run it on its own when you
want a populated bucket:

```bash
./xk6-couchbase run -e CB_USER=Administrator -e CB_PASS=password examples/load-sequential-data.js
```

## What each example demonstrates

| Script                          | Demonstrates                                              |
| ------------------------------- | -------------------------------------------------------- |
| `test-insert.js`                | Single document insert with a random key                 |
| `test-insertbatch.js`           | Bulk insert (50 docs per iteration)                      |
| `test-upsert.js`                | Upsert with a random key in a range                      |
| `test-findone.js`               | Key/value get of a single document                       |
| `test-find.js`                  | N1QL query via `USE KEYS` (no index required)            |
| `test-new-with-conn-per-vu.js`  | A dedicated connection per VU (max-connections testing)  |
| `test-new-with-shared-conn.js`  | A single shared connection across all VUs (max QPS)      |
| `load-sequential-data.js`       | Bulk load with sequential numeric IDs                    |

## Common flags

```bash
--vus 10 --duration 30s      # 10 virtual users for 30 seconds
--iterations 100 --vus 5     # 100 total iterations across 5 VUs
--quiet                      # suppress the progress bar
```

## Tear down

```bash
docker rm -f couchbase
```
