import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("flatten abort behavior", () => {
  it("should abort stream of streams with error when nested stream errors during abort", (done) => {
    const error = new Error("test error");
    let streamOfStreamsEnded: any = null;
    let nestedStreamEnded: any = null;

    const errorStream = (cb: (end: any, data?: any) => void) => {
      return (abort: any, callback: (end: any, data?: any) => void) => {
        if (abort) {
          nestedStreamEnded = abort;
          callback(error);
        } else {
          callback(null, 1);
        }
      };
    };

    const read = pull(
      pull.values([errorStream], (err: any) => {
        streamOfStreamsEnded = err;
      }),
      flatten()
    );

    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);

      read(true, (abortErr: any) => {
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