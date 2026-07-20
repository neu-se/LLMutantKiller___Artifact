import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should throw an error when called with more arguments than expected', () => {
    const read = pull(
      function (end, cb) {
        cb(null, 1);
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      }
    );

    expect(() => read(null, () => {})).toThrowError(TypeError);
  });
});