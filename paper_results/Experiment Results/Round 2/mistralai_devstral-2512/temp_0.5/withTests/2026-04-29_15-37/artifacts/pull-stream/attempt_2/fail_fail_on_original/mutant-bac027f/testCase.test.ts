const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source stream", () => {
  it("should handle source streams correctly", (done) => {
    const source = {
      source: function (read: any) {
        let count = 0;
        return function (abort: any, cb: any) {
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
      pull.collect((err: any, data: any) => {
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