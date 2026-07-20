import { take } from '../../../throughs/take';
import { values } from '../../../sources/values';
import { collect } from '../../../sinks/collect';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = take(1, { last: true });
    const data = values([1, 2, 3]);
    const result = collect();
    data(read, result);
    expect(result).toEqual([1]);
  });
});