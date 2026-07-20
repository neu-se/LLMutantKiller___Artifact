const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

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

    pull(
      source,
      collect((err: any, data: any) => {
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
  });
});