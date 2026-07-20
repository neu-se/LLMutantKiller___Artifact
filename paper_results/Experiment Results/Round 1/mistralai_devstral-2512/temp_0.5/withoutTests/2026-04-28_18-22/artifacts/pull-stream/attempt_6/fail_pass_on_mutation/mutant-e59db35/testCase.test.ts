import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior with falsy error", () => {
  it("should correctly propagate abort when error is falsy", (done) => {
    const testAbort = new Error("abort error");
    let secondReadAbortArg: any = null;
    let secondReadCbArg: any = null;

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        secondReadAbortArg = abort;
        secondReadCbArg = cb;
        // Original: read(err || abort, cb) → passes abort when err is falsy
        // Mutated: read(err && abort, cb) → passes false when err is falsy
        cb(abort);
      } else {
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end: any, data: any) => {
      // Trigger abort path with falsy error (undefined)
      flattened(testAbort, (err: any) => {
        // In original code: should receive testAbort
        // In mutated code: should receive false (from undefined && testAbort)
        expect(err).toBe(testAbort);
        expect(secondReadAbortArg).toBe(testAbort);
        done();
      });
    });
  });
});