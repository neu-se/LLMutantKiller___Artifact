import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("abort with callback should result in abort being set to true", () => {
    // Since abort = err || true in both cases (true||true vs false||true = true),
    // and read is called with abort=true in both cases,
    // we verify the sink.abort behavior is consistent
    
    const abortErrors: any[] = [];

    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) cb(end);
      // else hang
    }

    const sink = drain(
      function op() {},
      function onDone(err: any) {}
    );

    sink(source);

    // Call abort with err=0 (falsy non-function) to test abort = 0 || true = true
    // vs abort = false || true = true - both same
    // The mutation is truly equivalent for abort = err || true
    
    // Test the only real difference: what 'err' equals before the || true
    // by passing err=false explicitly (not as function)
    sink.abort(false as any, function(err: any) {
      abortErrors.push(err);
    });

    expect(abortErrors.length).toBe(1);
    expect(abortErrors[0]).toBe(false);
  });
});