import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort error propagation", () => {
  it("should pass abort signal when error is falsy", (done) => {
    const testAbort = new Error("test abort");
    let readCalls: Array<{ abort: any, cb: any }> = [];

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      readCalls.push({ abort, cb });
      if (abort) {
        // Original: read(err || abort, cb) → passes abort when err is falsy
        // Mutated: read(err && abort, cb) → passes false when err is falsy
        cb(abort);
      } else {
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end: any, data: any) => {
      // Trigger abort with falsy error
      flattened(testAbort, (err: any) => {
        // In original: should receive testAbort
        // In mutated: should receive false (from err && abort)
        expect(err).toBe(testAbort);
        expect(readCalls.length).toBe(2);
        expect(readCalls[1].abort).toBe(testAbort);
        done();
      });
    });
  });
});