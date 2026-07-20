import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("should pass truthy abort signal to source when op returns false", (done) => {
    const abortSignals: any[] = [];

    // A synchronous source that records abort signals and ends after a few items
    let count = 0;
    function source(abort: any, cb: (end: any, data?: any) => void) {
      abortSignals.push(abort);
      if (abort) {
        cb(abort);
        return;
      }
      if (count >= 10) {
        cb(true); // end naturally
        return;
      }
      cb(null, count++);
    }

    const sink = drain(
      (data: any) => {
        // Return false on first item to trigger the abort path
        if (data === 0) return false;
      },
      (_err: any) => {
        // After done is called, check the abort signal that was sent to source
        // Original: read(true, ...) -> abortSignals should contain `true`
        // Mutated: read(false, ...) -> abortSignals should contain `false` (falsy, not an abort)
        const abortAfterOpFalse = abortSignals[1]; // second call is the abort call
        expect(abortAfterOpFalse).toBeTruthy();
        done();
      }
    );

    sink(source);
  });
});