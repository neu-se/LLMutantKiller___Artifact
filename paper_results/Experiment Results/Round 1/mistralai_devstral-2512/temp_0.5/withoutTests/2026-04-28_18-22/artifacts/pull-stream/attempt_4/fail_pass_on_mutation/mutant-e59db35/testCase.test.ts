import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior", () => {
  it("should handle abort with falsy error correctly", (done) => {
    let abortCalledWith: any = null;
    let callbackInvokedWith: any = null;

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      abortCalledWith = abort;
      if (abort) {
        // Original: read(err || abort, cb) - when err is falsy, passes abort
        // Mutated: read(err && abort, cb) - when err is falsy, passes false
        callbackInvokedWith = abort;
        cb(abort);
      } else {
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end: any, data: any) => {
      // Now trigger abort path
      flattened(true, (err: any) => {
        // In original code, abort should be passed through when err is falsy
        // In mutated code, false would be passed instead
        expect(abortCalledWith).toBe(true);
        expect(callbackInvokedWith).toBe(true);
        expect(err).toBe(true);
        done();
      });
    });
  });
});