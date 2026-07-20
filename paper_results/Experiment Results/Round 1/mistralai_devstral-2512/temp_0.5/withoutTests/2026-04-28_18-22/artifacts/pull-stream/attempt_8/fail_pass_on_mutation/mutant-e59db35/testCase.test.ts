import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior", () => {
  it("should correctly handle abort when error is falsy", (done) => {
    const testAbort = new Error("abort");
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
      // Trigger abort with falsy error (undefined)
      flattened(testAbort, (err: any) => {
        // In original: should receive testAbort
        // In mutated: should receive false (from undefined && testAbort)
        expect(err).toBe(testAbort);
        expect(readCalls.length).toBe(2);
        expect(readCalls[1].abort).toBe(testAbort);
        done();
      });
    });
  });
});