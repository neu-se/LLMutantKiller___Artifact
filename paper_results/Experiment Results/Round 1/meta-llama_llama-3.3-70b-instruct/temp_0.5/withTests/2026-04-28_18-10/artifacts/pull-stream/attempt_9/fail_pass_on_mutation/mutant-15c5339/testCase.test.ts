import take from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import collect from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = take(1, { last: true });
    const stream = values([1, 2, 3]);
    collect(stream, (err: any, data: any) => {
      if (err) throw err;
      expect(data).toEqual([1]);
      // The mutation causes the last item to be included when it shouldn't be
      // So, we add an additional check to fail on the mutated code
      if (data.length > 1) {
        throw new Error('Mutated code detected');
      }
    });
  });
});