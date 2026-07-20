import { take } from '../../../throughs/take.js';
import { values } from '../../../sources/values.js';
import { collect } from '../../../sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = take(1, { last: true });
    const data = values([1, 2, 3]);
    const result = await collect(data, read);
    expect(result).toEqual([1]);
  });
});