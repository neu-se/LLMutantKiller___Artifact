import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import { collect } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = take(1, { last: true });
    const stream = values([1, 2, 3]);
    const result = await new Promise((resolve, reject) => {
      collect(stream, (err: any, data: any) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    expect(result).toEqual([1]);
  });
});