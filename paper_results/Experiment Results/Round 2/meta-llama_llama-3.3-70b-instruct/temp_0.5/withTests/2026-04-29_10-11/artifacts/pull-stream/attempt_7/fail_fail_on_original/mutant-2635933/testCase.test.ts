import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const read = function (end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 'object');
    };

    const s = function (read: any) {
      return function (end: any, cb: any) {
        read(end, function (end: any, data: any) {
          if (end) return cb(end);
          if (typeof data === 'object' || typeof data === 'string') {
            cb(null, data);
          } else {
            cb(new Error('Expected object or string'));
          }
        });
      };
    };

    expect(() => pull(read, s)).not.toThrow();

    const mutatedRead = function (end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 123);
    };

    expect(() => pull(mutatedRead, s)).toThrow();
  });
});