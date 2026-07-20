const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should immediately propagate abort when not busy", (done) => {
    const error = new Error("test abort");
    let abortReceived = false;
    let firstReadCompleted = false;
    let abortCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortReceived = true;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      asyncMap((data: any, cb: (err: any, data?: any) => void) => {
        setImmediate(() => {
          cb(null, data);
        });
      })
    );

    // First read to get data
    read(null, (end: any, data: any) => {
      firstReadCompleted = true;
      expect(data).toBe(1);
    });

    // Immediately abort after first read
    setImmediate(() => {
      read(error, (end: any) => {
        abortCalled = true;
        expect(end).toBe(error);
        expect(abortReceived).toBe(true);
        expect(firstReadCompleted).toBe(true);
        expect(abortCalled).toBe(true);
        done();
      });
    });
  });
});