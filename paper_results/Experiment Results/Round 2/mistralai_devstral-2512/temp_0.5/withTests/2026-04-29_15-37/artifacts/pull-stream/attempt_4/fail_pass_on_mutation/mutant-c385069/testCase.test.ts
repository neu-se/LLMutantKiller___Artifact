const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should immediately propagate abort to source when not busy", (done) => {
    const error = new Error("test abort");
    let sourceAbortCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        sourceAbortCount++;
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

      // First abort call - should propagate to source in original code
      read(error, (abortEnd: any) => {
        expect(abortEnd).toBe(error);
        expect(sourceAbortCount).toBe(1);

        // Second abort call - source should not be called again
        read(error, (abortEnd2: any) => {
          expect(abortEnd2).toBe(error);
          expect(sourceAbortCount).toBe(1); // Should still be 1
          done();
        });
      });
    });
  });
});