import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should throw an error when the mutated code is used', () => {
    const read = function (end, cb) {
      if (end) return cb(end);
      cb(null, 'object');
    };

    const s = function (read) {
      return function (end, cb) {
        read(end, function (end, data) {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    };

    expect(() => pull(read, s)).toThrowError();
  });
});