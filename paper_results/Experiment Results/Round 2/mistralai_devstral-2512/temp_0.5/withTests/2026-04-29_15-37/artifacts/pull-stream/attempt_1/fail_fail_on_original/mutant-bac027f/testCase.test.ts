import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with source stream", () => {
  it("should handle source streams correctly", (done) => {
    const source = {
      source: function (read) {
        let count = 0;
        return function (abort, cb) {
          if (abort) {
            cb(abort);
          } else if (count < 3) {
            cb(null, count++);
          } else {
            cb(true);
          }
        };
      }
    };

    const results: number[] = [];
    const read = pull(
      source,
      pull.collect((err, data) => {
        if (err) {
          done(err);
        } else {
          try {
            expect(data).toEqual([0, 1, 2]);
            done();
          } catch (e) {
            done(e);
          }
        }
      })
    );

    // Trigger the read
    read(null, () => {});
  });
});