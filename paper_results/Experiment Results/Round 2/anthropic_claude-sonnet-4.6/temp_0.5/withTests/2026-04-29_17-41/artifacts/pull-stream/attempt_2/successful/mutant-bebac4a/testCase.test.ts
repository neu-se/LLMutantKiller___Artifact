import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort() before source is connected", () => {
  it("should not throw when abort is called before the sink has a source", () => {
    // Create a drain sink
    const sink = drain(
      function (data: unknown) { /* noop op */ },
      function (err: unknown) { /* noop done */ }
    );

    // In the original code: sink.abort() checks `if(read)` - since read is not set yet,
    // it does nothing (no-op). This should NOT throw.
    //
    // In the mutated code: sink.abort() checks `if(true)` - it always tries to call
    // read(abort, cb), but read is undefined at this point, causing a TypeError.
    expect(() => {
      sink.abort();
    }).not.toThrow();
  });
});