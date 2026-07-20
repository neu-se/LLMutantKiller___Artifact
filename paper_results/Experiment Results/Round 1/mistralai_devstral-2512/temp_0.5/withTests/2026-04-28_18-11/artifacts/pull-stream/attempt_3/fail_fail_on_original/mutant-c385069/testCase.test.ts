const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should propagate abort when not busy", (done) => {
    const error = new Error("test abort");
    let abortReceived = false;
    let firstReadCompleted = false;

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

    read(null, (end: any, data: any) => {
      firstReadCompleted = true;
      expect(data).toBe(1);
    });

    read(error, (end: any) => {
      expect(end).toBe(error);
      expect(abortReceived).toBe(true);
      expect(firstReadCompleted).toBe(true);
      done();
    });
  });
});