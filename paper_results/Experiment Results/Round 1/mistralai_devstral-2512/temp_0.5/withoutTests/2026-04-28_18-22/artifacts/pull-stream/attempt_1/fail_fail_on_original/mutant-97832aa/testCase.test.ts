import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle null values in stream correctly', () => {
    const source = {
      source: function (abort, cb) {
        cb(null, 1);
        cb(null, 2);
        cb(true);
      }
    };

    const transform = {
      source: function (read) {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, data * 2);
          });
        };
      },
      sink: function (read) {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, data + 1);
          });
        };
      }
    };

    const results: number[] = [];
    const sink = function (read) {
      read(null, function (end, data) {
        if (!end) results.push(data);
      });
    };

    pull(source, transform, sink);

    expect(results).toEqual([3, 5]);
  });
});