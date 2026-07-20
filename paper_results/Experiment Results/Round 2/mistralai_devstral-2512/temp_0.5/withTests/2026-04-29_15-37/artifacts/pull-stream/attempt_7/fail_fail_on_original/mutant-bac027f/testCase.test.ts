const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source stream", () => {
  it("should handle source streams correctly", (done) => {
    let count = 0;
    const source = {
      source: function (read: any) {
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
    let received = 0;
    read(null, function next(end: any, data: any) {
      if (end === true) {
        try {
          expect(received).toBe(3);
          done();
        } catch (e) {
          done(e);
        }
      } else if (end) {
        done(end);
      } else {
        received++;
        read(null, next);
      }
    });
  });
});