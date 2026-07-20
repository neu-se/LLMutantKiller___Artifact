const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with mixed arguments", () => {
  it("should correctly process a stream with both function and non-function arguments", () => {
    const source = {
      source: function (read: any) {
        let i = 0;
        const values = [1, 2, 3];
        return function (end: any, cb: any) {
          if (end) return cb(end);
          if (i >= values.length) return cb(true);
          cb(null, values[i++]);
        };
      }
    };

    const through = function (read: any) {
      return function (end: any, cb: any) {
        read(end, function (end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    };

    const sink = function (read: any) {
      const results: number[] = [];
      return function (end: any, cb: any) {
        read(end, function next(end: any, data: any) {
          if (end) {
            cb(end);
            return;
          }
          results.push(data);
          read(null, next);
        });
      };
    };

    const pipeline = pull(source, through, sink);
    expect(Array.isArray(pipeline)).toBe(false);
    expect(typeof pipeline).toBe('function');
  });
});