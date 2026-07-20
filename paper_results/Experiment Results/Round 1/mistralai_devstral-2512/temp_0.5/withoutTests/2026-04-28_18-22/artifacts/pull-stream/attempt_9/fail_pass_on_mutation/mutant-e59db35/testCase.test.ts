import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort error handling", () => {
  it("should propagate abort signal when error is falsy", (done) => {
    const testAbort = new Error("test abort");
    let secondReadAbortArg: any = null;
    let secondReadCbInvokedWith: any = null;

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        secondReadAbortArg = abort;
        // Original: read(err || abort, cb) → passes abort when err is falsy
        // Mutated: read(err && abort, cb) → passes false when err is falsy
        cb(abort);
      } else {
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end: any, data: any) => {
      // Trigger abort path with falsy error
      flattened(testAbort, (err: any) => {
        // In original: err should be testAbort
        // In mutated: err should be false (from undefined && testAbort)
        expect(err).toBe(testAbort);
        expect(secondReadAbortArg).toBe(testAbort);
        done();
      });
    });
  });
});