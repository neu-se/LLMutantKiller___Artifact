const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should call source abort callback when not busy", (done) => {
    const error = new Error("test abort");
    let sourceAbortCallbackCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        sourceAbortCallbackCount++;
        setImmediate(() => cb(abort));
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

      // At this point, the asyncMap is not busy
      // The mutation changes `if(!busy)` to `if(false)`, preventing the source abort call
      read(error, (abortEnd: any) => {
        expect(abortEnd).toBe(error);
        // In original code, source should be called with abort
        // In mutated code, source won't be called with abort
        expect(sourceAbortCallbackCount).toBe(1);
        done();
      });
    });
  });
});