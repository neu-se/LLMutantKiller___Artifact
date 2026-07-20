import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort error handling", () => {
  it("should distinguish between abort and error propagation", (done) => {
    const testError = new Error("test error");
    const testAbort = new Error("abort signal");
    let readCallCount = 0;
    let lastAbortArg: any = null;
    let lastCallbackArg: any = null;

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      readCallCount++;
      lastAbortArg = abort;
      if (abort) {
        // Original: read(err || abort, cb) → passes abort when err is falsy
        // Mutated: read(err && abort, cb) → passes false when err is falsy
        lastCallbackArg = abort;
        cb(abort);
      } else {
        cb(testError);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end: any, data: any) => {
      // This should trigger the abort path with a falsy error
      flattened(testAbort, (err: any) => {
        // In original: err should be testAbort (from err || abort)
        // In mutated: err should be false (from err && abort)
        expect(err).toBe(testAbort);
        expect(readCallCount).toBe(2);
        expect(lastAbortArg).toBe(testAbort);
        expect(lastCallbackArg).toBe(testAbort);
        done();
      });
    });
  });
});