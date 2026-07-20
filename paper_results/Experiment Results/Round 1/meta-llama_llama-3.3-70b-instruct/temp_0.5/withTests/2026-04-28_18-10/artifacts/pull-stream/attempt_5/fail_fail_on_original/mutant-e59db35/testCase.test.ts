import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';
import { flatten } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten';

describe('flatten', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = flatten()(values([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]));

    const result: number[] = [];
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // Test abort behavior
    const abortedRead = flatten()(values([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]));

    abortedRead(true, (end: any, data: any) => {
      if (end) return;
      expect(end).toBe(true);
    });
  });
});