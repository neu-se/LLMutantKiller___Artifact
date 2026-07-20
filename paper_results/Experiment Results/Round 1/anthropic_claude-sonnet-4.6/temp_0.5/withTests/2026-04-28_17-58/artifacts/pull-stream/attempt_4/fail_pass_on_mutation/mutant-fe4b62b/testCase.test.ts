import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("should call source with truthy end value when abort is invoked with only a callback", (done) => {
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    // Async source that hangs until explicitly resolved
    function hangingSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        // Capture what end value was passed
        cb(end);
        return;
      }
      // Hang on normal reads
      pendingCb = cb;
    }

    const sink = drain(
      function op() {},
      function onDone(err: any) {
        // Original: abort=true, so err passed here is null (true -> null conversion)
        // Mutated: abort=false (falsy), stream never properly aborts
        expect(err).toBeNull();
        done();
      }
    );

    sink(hangingSource);

    // Wait for source to be hanging, then abort with just a callback
    expect(pendingCb).not.toBeNull();

    // Call abort with a function argument
    // Original: cb=fn, err=true -> abort=true -> read(true, fn)
    // Mutated: cb=fn, err=false -> abort=false -> read(false, fn) -> source treats as normal read
    sink.abort(function(err: any) {
      // With original: called with true
      // With mutated: source hangs again (treats false as normal read)
      expect(err).toBeTruthy();
      done();
    });
  });
});