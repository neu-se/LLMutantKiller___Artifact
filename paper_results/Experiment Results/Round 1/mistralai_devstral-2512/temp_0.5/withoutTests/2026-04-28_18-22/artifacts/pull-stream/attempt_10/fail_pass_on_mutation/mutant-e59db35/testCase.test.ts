import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior", () => {
  it("should handle abort with falsy error correctly", (done) => {
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
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end: any, data: any) => {
      // Trigger abort with falsy error (undefined)
      flattened(testAbort, (err: any) => {
        // In original: should receive testAbort
        // In mutated: should receive false (from undefined && testAbort)
        expect(err).toBe(testAbort);
        expect(readCallCount).toBe(2);
        expect(lastAbortArg).toBe(testAbort);
        expect(lastCallbackArg).toBe(testAbort);
        done();
      });
    });
  });
});