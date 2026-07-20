# xk6-couchbase — build & development tasks.
#
# Building a k6 extension requires `xk6`, which compiles a custom k6 binary with
# this extension linked in (a plain `go build` cannot produce a runnable k6).

MODULE      := github.com/thotasrinath/xk6-couchbase
BINARY      := xk6-couchbase
XK6         := go run go.k6.io/xk6/cmd/xk6@latest

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

$(BINARY): $(filter-out %_test.go,$(wildcard *.go)) go.mod go.sum
	$(XK6) build --output $(BINARY) --with $(MODULE)=.

.PHONY: build
build: $(BINARY) ## Build a k6 binary with this extension (from local source)

.PHONY: test
test: ## Run unit tests
	go test -count=1 ./...

.PHONY: test-race
test-race: ## Run unit tests with the race detector
	go test -count=1 -race ./...

.PHONY: cover
cover: ## Run tests and open an HTML coverage report
	go test -count=1 -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out

.PHONY: vet
vet: ## Run go vet (no external tools required)
	go vet ./...

.PHONY: lint
lint: ## Run golangci-lint (install: https://golangci-lint.run)
	@command -v golangci-lint >/dev/null 2>&1 \
		|| { echo "golangci-lint not found; install from https://golangci-lint.run"; exit 1; }
	golangci-lint run

.PHONY: fmt
fmt: ## Format Go sources
	gofmt -s -w .

.PHONY: tidy
tidy: ## Tidy go.mod / go.sum
	go mod tidy

.PHONY: check
check: fmt vet test ## Format, vet, and test (pre-commit gate)

# --- Local Couchbase & example validation ---
# Override creds/host to point at an existing cluster, e.g.:
#   make validate CB_HOST=10.0.0.5 CB_USER=admin CB_PASS=secret
CB_HOST ?= localhost
CB_USER ?= Administrator
CB_PASS ?= password
CB_BUCKET ?= test

CB_ENV := CB_HOST=$(CB_HOST) CB_USER=$(CB_USER) CB_PASS=$(CB_PASS) CB_BUCKET=$(CB_BUCKET)

.PHONY: couchbase-up
couchbase-up: ## Start & init a local Couchbase (reuses an existing one if reachable)
	$(CB_ENV) ./scripts/couchbase.sh up

.PHONY: couchbase-down
couchbase-down: ## Remove the local Couchbase container created by couchbase-up
	$(CB_ENV) ./scripts/couchbase.sh down

.PHONY: validate
validate: $(BINARY) couchbase-up ## Build, ensure Couchbase, and run every example end-to-end
	$(CB_ENV) ./scripts/run-examples.sh

.PHONY: clean
clean: ## Remove build artifacts
	rm -f $(BINARY) coverage.out
