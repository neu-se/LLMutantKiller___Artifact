import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb);
        };
      }
    );
    read(null, (end: any, data: any) => {
      if (end) throw new Error('Unexpected end');
      expect(data).toBe(1);
    });
  });
});