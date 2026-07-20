const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const flatten = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js");

describe("flatten abort behavior", () => {
  it("should abort stream of streams with error when nested stream errors during abort", (done) => {
    const error = new Error("test error");
    let streamOfStreamsEnded = null;
    let nestedStreamEnded = null;

    const errorStream = (cb) => {
      return (abort, callback) => {
        if (abort) {
          nestedStreamEnded = abort;
          callback(error);
        } else {
          callback(null, 1);
        }
      };
    };

    const read = pull(
      pull.values([errorStream], (err) => {
        streamOfStreamsEnded = err;
      }),
      flatten()
    );

    read(null, (err, data) => {
      expect(err).toBeNull();
      expect(data).toBe(1);

      read(true, (abortErr) => {
        expect(abortErr).toBe(error);

        setImmediate(() => {
          expect(streamOfStreamsEnded).toBe(error);
          expect(nestedStreamEnded).toBe(true);
          done();
        });
      });
    });
  });
});