import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import * as pullThroughs from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pullEnd from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("pull stream with object stream", () => {
  it("should handle object streams correctly", (done) => {
    const source = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        if (abort) return cb(abort);
        cb(null, "test");
      },
      sink: function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
        read(null, (end: any, data: any) => {
          if (end) return;
        });
      }
    };

    const result: any[] = [];
    pull(
      source,
      pullThroughs.through((data: any) => {
        result.push(data);
      }),
      pullEnd.onEnd((err: any) => {
        if (err) return done(err);
        expect(result).toEqual(["test"]);
        done();
      })
    );
  });
});