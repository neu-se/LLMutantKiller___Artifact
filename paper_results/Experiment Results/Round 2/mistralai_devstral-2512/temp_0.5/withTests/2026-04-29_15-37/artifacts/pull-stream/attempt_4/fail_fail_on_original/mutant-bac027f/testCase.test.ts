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

    const read = pull(source);
    read(null, function next(end: any, data: any) {
      if (end === true) {
        done();
      } else if (end) {
        done(end);
      } else {
        read(null, next);
      }
    });
  });
});