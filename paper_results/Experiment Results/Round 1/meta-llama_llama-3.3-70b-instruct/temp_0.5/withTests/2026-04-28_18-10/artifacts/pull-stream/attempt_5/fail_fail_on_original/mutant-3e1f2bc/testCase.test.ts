import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = pull.values([1, 2, 3]);
    const sink = pull.collect((err: any, ary: any) => {
      expect(err).toBeNull();
      expect(ary).toEqual([1, 2, 3]);
    });
    pull(source, (s: any) => {
      if (s && typeof s === 'object') {
        return s;
      }
      return s;
    }, sink);
  });
});