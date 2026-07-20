import { take } from '../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import { values } from '../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import { collect } from '../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = take(1);
    const data = values([1, 2, 3]);
    const result = collect();
    data(data, read, result);
    expect(result).toEqual([1]);
  });
});