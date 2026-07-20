import { pull } from '../../../pull.js';

describe('pull', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const read = function (end: any, cb: any) {
      if (end) return cb(end);
      cb(null, { foo: 'bar' });
    };

    const s = function (read: any) {
      return function (end: any, cb: any) {
        read(end, function (end: any, data: any) {
          if (end) return cb(end);
          if (typeof data === 'object' && data !== null) {
            cb(null, data);
          } else {
            cb(new Error('Expected non-null object'));
          }
        });
      };
    };

    expect(() => pull(read, s)).not.toThrow();

    const mutatedRead = function (end: any, cb: any) {
      if (end) return cb(end);
      cb(null, null);
    };

    expect(() => pull(mutatedRead, s)).toThrow();
  });
});