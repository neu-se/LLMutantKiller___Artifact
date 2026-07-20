const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const flatten = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("flatten abort behavior", () => {
  it("should properly handle abort when nested stream has error", (done) => {
    const error = new Error("test error");
    let streamOfStreamsEnded: any = null;
    let nestedStreamEnded: any = null;

    const errorStream = (cb: any) => {
      return (abort: any, callback: any) => {
        if (abort) {
          nestedStreamEnded = abort;
          callback(error);
        } else {
          callback(null, 1);
        }
      };
    };

    const read = pull(
      values([errorStream], (err: any) => {
        streamOfStreamsEnded = err;
      }),
      flatten()
    );

    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);

      read(true, (abortErr: any) => {
        expect(abortErr).toBe(error);

        setTimeout(() => {
          expect(streamOfStreamsEnded).toBe(error);
          expect(nestedStreamEnded).toBe(true);
          done();
        }, 100);
      });
    });
  }, 1000);
});