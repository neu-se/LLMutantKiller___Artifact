import { flatten } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';

describe('flatten', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = flatten();
    const stream = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    const result: number[] = [];
    read(null, (end, data) => {
      if (end) return;
      result.push(data);
    });
    stream.forEach((chunk) => {
      read(null, (end, data) => {
        if (end) return;
        result.push(...data);
      });
    });

    expect(result).toEqual([1]);

    // Test abort behavior
    const abortedRead = flatten();
    const error = new Error('Test error');
    abortedRead(error, (end, data) => {
      if (end) return;
      if (end === error) {
        throw new Error('Expected error not thrown');
      }
    });

    // This should not throw an error when run against the original code
    // But should throw an error when run against the mutated code
    abortedRead(error, (end, data) => {
      if (end) return;
      if (end !== error) {
        throw new Error('Expected error not thrown');
      }
    });
  });
});