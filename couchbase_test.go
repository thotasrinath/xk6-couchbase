package xk6_couchbase

import (
	"testing"
	"time"

	k6modules "go.k6.io/k6/v2/js/modules"
	"go.k6.io/k6/v2/js/modulestest"
)

func TestParseStringToDuration(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name  string
		input string
		want  time.Duration
	}{
		{name: "seconds", input: "5s", want: 5 * time.Second},
		{name: "milliseconds", input: "250ms", want: 250 * time.Millisecond},
		{name: "compound", input: "1m30s", want: 90 * time.Second},
		{name: "empty falls back to default", input: "", want: defaultBucketReadinessTimeout},
		{name: "garbage falls back to default", input: "not-a-duration", want: defaultBucketReadinessTimeout},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := parseStringToDuration(tt.input); got != tt.want {
				t.Fatalf("parseStringToDuration(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

// TestModuleWiring verifies the k6 module lifecycle: a single RootModule, a
// per-VU ModuleInstance that points back to that root, and a Default export
// that is a *CouchBase carrying the same shared root.
func TestModuleWiring(t *testing.T) {
	t.Parallel()

	root := New()
	if root == nil {
		t.Fatal("New() returned nil")
	}

	rt := modulestest.NewRuntime(t)
	inst := root.NewModuleInstance(rt.VU)

	mi, ok := inst.(*ModuleInstance)
	if !ok {
		t.Fatalf("NewModuleInstance returned %T, want *ModuleInstance", inst)
	}
	if mi.root != root {
		t.Fatal("ModuleInstance does not point to the root module")
	}
	if mi.vu != rt.VU {
		t.Fatal("ModuleInstance did not capture the VU")
	}

	exports := inst.Exports()
	cb, ok := exports.Default.(*CouchBase)
	if !ok {
		t.Fatalf("Default export is %T, want *CouchBase", exports.Default)
	}
	if cb.root != root {
		t.Fatal("exported CouchBase does not share the root module")
	}
}

// TestSharedConnectionSingleton is the core guarantee of the refactor: two VUs
// (two ModuleInstances built from the same root) must share a single client in
// shared-connection mode. gocb.Connect is lazy, so no live cluster is needed.
func TestSharedConnectionSingleton(t *testing.T) {
	t.Parallel()

	root := New()
	cbVU1 := couchbaseFor(t, root)
	cbVU2 := couchbaseFor(t, root)

	dbConfig := DBConfig{Hostname: "127.0.0.1", Username: "u", Password: "p"}
	opts := options{DoConnectionPerVU: false}

	client1, err := cbVU1.getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		t.Fatalf("VU1 shared connect: %v", err)
	}
	client2, err := cbVU2.getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		t.Fatalf("VU2 shared connect: %v", err)
	}

	if client1 != client2 {
		t.Fatal("shared mode returned different clients across VUs; singleton not shared")
	}
	if root.singletonClient != client1 {
		t.Fatal("root.singletonClient not populated with the shared client")
	}
	t.Cleanup(func() { _ = client1.Close() })
}

// TestPerVUConnection verifies the opposite mode: each call gets its own client.
func TestPerVUConnection(t *testing.T) {
	t.Parallel()

	root := New()
	cb := couchbaseFor(t, root)

	dbConfig := DBConfig{Hostname: "127.0.0.1", Username: "u", Password: "p"}
	opts := options{DoConnectionPerVU: true}

	client1, err := cb.getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		t.Fatalf("per-VU connect 1: %v", err)
	}
	client2, err := cb.getCouchbaseInstance(dbConfig, opts)
	if err != nil {
		t.Fatalf("per-VU connect 2: %v", err)
	}

	if client1 == client2 {
		t.Fatal("per-VU mode reused a client; expected distinct connections")
	}
	if root.singletonClient != nil {
		t.Fatal("per-VU mode should not populate the shared singleton")
	}
	t.Cleanup(func() { _ = client1.Close(); _ = client2.Close() })
}

// TestNewClientWithOptionsDefaultsBufferSize verifies the buffer-size default is
// applied and the client is wired with the supplied options.
func TestNewClientWithOptionsDefaultsBufferSize(t *testing.T) {
	t.Parallel()

	cb := couchbaseFor(t, New())
	dbConfig := DBConfig{Hostname: "127.0.0.1", Username: "u", Password: "p"}

	client, err := cb.NewClientWithOptions(dbConfig, options{DoConnectionPerVU: true})
	if err != nil {
		t.Fatalf("NewClientWithOptions: %v", err)
	}
	if client.options.ConnectionBufferSizeBytes != defaultConnectionBufferSizeBytes {
		t.Fatalf("buffer size = %d, want default %d",
			client.options.ConnectionBufferSizeBytes, defaultConnectionBufferSizeBytes)
	}
	t.Cleanup(func() { _ = client.Close() })
}

// couchbaseFor spins up a real VU-scoped CouchBase export from the given root,
// mirroring how k6 hands the API object to each VU.
func couchbaseFor(t *testing.T, root *RootModule) *CouchBase {
	t.Helper()
	rt := modulestest.NewRuntime(t)
	inst := root.NewModuleInstance(rt.VU)
	cb, ok := inst.Exports().Default.(*CouchBase)
	if !ok {
		t.Fatalf("Default export is %T, want *CouchBase", inst.Exports().Default)
	}
	return cb
}

// Compile-time guard kept alongside the runtime checks in couchbase.go.
var _ k6modules.Module = (*RootModule)(nil)
