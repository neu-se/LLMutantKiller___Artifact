import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should pass through values when read.source is a function', () => {
    const values = [1, 2, 3];
    const read = {
      source: () => {
        return {
          source: () => {
            return function (end, cb) {
              if (end) return cb(end);
              cb(null, values.shift());
            };
          },
        };
      },
    };

    const result = [];
    pull(read, (read) => {
      return function (end, cb) {
        read(end, (end, data) => {
          if (end) return cb(end);
          result.push(data);
          cb(null, data);
        });
      };
    }, (read) => {
      return function (end, cb) {
        read(end, (end, data) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    });

    expect(result).toEqual([1, 2, 3]);
  });
});