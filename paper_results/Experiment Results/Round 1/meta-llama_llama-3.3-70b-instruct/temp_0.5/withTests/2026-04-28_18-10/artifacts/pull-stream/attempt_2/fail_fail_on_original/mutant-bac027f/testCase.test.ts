import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = pull.values([1, 2, 3]);
    const read = pull(
      source,
      function (read) {
        return function (end, cb) {
          if (end) cb(end);
          else read(null, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      }
    );

    let called = false;
    read(null, function (end, data) {
      called = true;
      expect(end).toBe(null);
      expect(data).toBe(1);
    });

    expect(called).toBe(true);
  });
});