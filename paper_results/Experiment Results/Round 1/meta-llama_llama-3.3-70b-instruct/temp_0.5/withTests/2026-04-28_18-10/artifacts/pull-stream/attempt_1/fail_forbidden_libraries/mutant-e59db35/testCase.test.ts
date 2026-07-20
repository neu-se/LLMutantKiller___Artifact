import { Test, expect } from '@jest/globals';
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

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // Test abort behavior
    const abortedResult: number[] = [];
    const abortedStream = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const abortedRead = flatten();
    abortedRead(true, (end, data) => {
      if (end) return;
      abortedResult.push(data);
    });
    abortedStream.forEach((chunk) => {
      abortedRead(null, (end, data) => {
        if (end) return;
        abortedResult.push(...data);
      });
    });

    expect(abortedResult).toEqual([]);
  });
});