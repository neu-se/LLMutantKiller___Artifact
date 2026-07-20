import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should throw an error when the mutated code is used', () => {
    const read = pull(
      pull.values([1, 2, 3, 4, 5]),
      function (read) {
        return function (end, cb) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      function (read) {
        return function (end, cb) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      function (read) {
        return function (end, cb) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      function (read) {
        return function (end, cb) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      }
    );

    expect(() => read(null, () => {})).toThrowError();
  });
});