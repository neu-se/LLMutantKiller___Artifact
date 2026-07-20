import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = pull(
      pull.values([1, 2, 3]),
      (s: any) => {
        if (s && typeof s === 'object' && s!== null) {
          throw new Error('Expected not an object');
        }
        return s;
      }
    );
    const sink = pull(
      pull.collect((err: any, ary: any) => {
        expect(err).toBeInstanceOf(Error);
      })
    );
    pull(source, sink);
  });
});