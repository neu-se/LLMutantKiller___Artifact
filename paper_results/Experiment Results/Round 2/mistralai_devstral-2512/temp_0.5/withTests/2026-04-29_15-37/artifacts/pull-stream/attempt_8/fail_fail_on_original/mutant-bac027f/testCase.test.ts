const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source stream", () => {
  it("should handle source streams correctly", () => {
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
    const results: number[] = [];
    let ended = false;

    read(null, function next(end: any, data: any) {
      if (end === true) {
        ended = true;
      } else if (end) {
        throw end;
      } else {
        results.push(data);
        if (!ended) {
          read(null, next);
        }
      }
    });

    expect(results).toEqual([0, 1, 2]);
    expect(ended).toBe(true);
  });
});