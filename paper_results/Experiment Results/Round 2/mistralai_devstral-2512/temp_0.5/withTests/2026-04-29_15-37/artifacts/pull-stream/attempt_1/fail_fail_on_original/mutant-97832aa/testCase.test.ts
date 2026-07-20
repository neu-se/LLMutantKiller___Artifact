import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

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
          // This should not be called for object streams
        });
      }
    };

    const result: any[] = [];
    pull(
      source,
      pull.through((data) => {
        result.push(data);
      }),
      pull.onEnd((err) => {
        if (err) return done(err);
        // The mutation would cause this to fail because it would incorrectly
        // treat the object stream as a valid stream when it shouldn't
        expect(result).toEqual(["test"]);
        done();
      })
    );
  });
});