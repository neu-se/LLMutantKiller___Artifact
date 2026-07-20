const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should immediately abort when not busy and call source with abort", (done) => {
    const error = new Error("test abort");
    let sourceAbortCalled = false;
    let sourceAbortReceived = null;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        sourceAbortCalled = true;
        sourceAbortReceived = abort;
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

      // At this point, the asyncMap is not busy (busy = false)
      // The mutation changes the condition from `if(!busy)` to `if(false)`
      // So in the mutated version, the source won't be called with abort
      read(error, (abortEnd: any) => {
        expect(abortEnd).toBe(error);
        expect(sourceAbortCalled).toBe(true);
        expect(sourceAbortReceived).toBe(error);
        done();
      });
    });
  });
});