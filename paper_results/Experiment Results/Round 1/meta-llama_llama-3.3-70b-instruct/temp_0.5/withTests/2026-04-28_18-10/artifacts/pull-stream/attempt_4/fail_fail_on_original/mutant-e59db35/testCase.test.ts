import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('flatten', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = pull(
      pull.values([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]),
      pull.flatten()
    );

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
    const abortedRead = pull(
      pull.values([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]),
      pull.flatten()
    );

    abortedRead(true, (end: any, data: any) => {
      if (end) return;
      expect(end).toBe(true);
    });
  });
});