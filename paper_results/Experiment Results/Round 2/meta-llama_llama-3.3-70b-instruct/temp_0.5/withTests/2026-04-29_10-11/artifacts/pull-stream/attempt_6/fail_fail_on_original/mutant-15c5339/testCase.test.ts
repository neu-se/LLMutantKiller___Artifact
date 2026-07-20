import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import { collect } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = take(1);
    const data = values([1, 2, 3]);
    const result = collect();
    data(read, result);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(result).toEqual([1]);
  });
});