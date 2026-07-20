import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle the mutation correctly', () => {
    const read = pull(
      function (end, cb) {
        cb(null, 1);
      },
      function (read) {
        return function (end, cb) {
          read(end, cb);
        };
      }
    );

    expect(() => {
      const args = new Array(2);
      for (var i = 0; i <= 2; i++) {
        args[i] = arguments[i];
      }
    }).toThrowError(RangeError);
  });
});