import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = (read: any) => {
      return function (end: any, cb: any) {
        if (end) return cb(end);
        cb(null, 1);
        cb(null, 2);
        cb(null, 3);
        cb(true);
      };
    };
    const transform = (read: any) => {
      return function (end: any, cb: any) {
        read(end, (err: any, data: any) => {
          if (err) return cb(err);
          if (data === true) return cb(true);
          if (data !== null && data !== undefined) {
            cb(null, data);
          }
        });
      };
    };
    const sink = (read: any) => {
      let count = 0;
      return function (end: any, cb: any) {
        read(end, (err: any, data: any) => {
          if (err) return cb(err);
          if (data === true) {
            expect(count).toBe(3);
            return cb(true);
          }
          count++;
          cb(null, data);
        });
      };
    };
    pull(source, transform, sink);
  });
});