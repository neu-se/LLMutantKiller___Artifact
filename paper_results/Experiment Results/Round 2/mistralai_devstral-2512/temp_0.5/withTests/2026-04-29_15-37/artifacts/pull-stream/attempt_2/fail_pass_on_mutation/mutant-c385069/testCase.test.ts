const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should immediately abort when not busy", (done) => {
    const error = new Error("test abort");
    let abortCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortCalled = true;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      asyncMap((data: any, cb: (err: any, data?: any) => void) => {
        setImmediate(() => cb(null, data));
      })
    );

    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);

      read(error, (abortEnd: any) => {
        expect(abortEnd).toBe(error);
        expect(abortCalled).toBe(true);
        done();
      });
    });
  });
});