import { pull } from '../../../pull.js';

describe('pull', () => {
  it('should pass on the original code and fail on the mutated code', () => {
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

    expect(() => pull(read, s)).not.toThrow();
  });
});