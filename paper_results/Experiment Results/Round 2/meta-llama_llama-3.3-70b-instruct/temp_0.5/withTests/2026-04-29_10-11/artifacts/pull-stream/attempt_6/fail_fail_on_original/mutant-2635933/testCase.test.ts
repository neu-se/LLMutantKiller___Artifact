import { pull } from "../../../../../../../../subject_repositories/pull-stream/pull.js";

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
          if (typeof data === 'object') {
            cb(null, data);
          } else {
            cb(new Error('Expected object'));
          }
        });
      };
    };

    expect(() => pull(read, s)).not.toThrow();

    const mutatedS = function (read: any) {
      return function (end: any, cb: any) {
        read(end, function (end: any, data: any) {
          if (end) return cb(end);
          if (typeof data !== 'object') {
            cb(null, data);
          } else {
            cb(new Error('Not expected object'));
          }
        });
      };
    };

    expect(() => pull(read, mutatedS)).toThrow();
  });
});