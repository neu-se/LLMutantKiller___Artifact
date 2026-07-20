import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = function (end: any, cb: any) {
      if (end) cb(end);
      else cb(null, 1);
    };

    const read = pull(
      source,
      function (read: any) {
        return function (end: any, cb: any) {
          if (end) cb(end);
          else read(null, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      }
    );

    let called = false;
    read(null, function (end: any, data: any) {
      called = true;
      expect(end).toBe(null);
      expect(data).toBe(1);
    });

    expect(called).toBe(true);
  });
});