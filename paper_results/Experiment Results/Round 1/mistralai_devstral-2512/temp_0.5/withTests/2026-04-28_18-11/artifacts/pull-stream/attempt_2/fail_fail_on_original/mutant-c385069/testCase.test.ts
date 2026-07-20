const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should propagate abort when not busy", (done) => {
    const error = new Error("test abort");
    let abortReceived = false;

    const source = (abort, cb) => {
      if (abort) {
        abortReceived = true;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      asyncMap((data, cb) => {
        setImmediate(() => cb(null, data));
      })
    );

    read(null, (end, data) => {
      expect(data).toBe(1);
    });

    read(error, (end) => {
      expect(end).toBe(error);
      expect(abortReceived).toBe(true);
      done();
    });
  });
});