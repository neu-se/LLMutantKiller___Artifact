import { flatten } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';

describe('flatten', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = flatten();
    const stream = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    const result: any[] = [];
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    stream.forEach((chunk: any) => {
      read(null, (end: any, data: any) => {
        if (end) return;
        result.push(...data);
      });
    });

    expect(result.length).toBeGreaterThan(0);

    // Test abort behavior
    const abortedRead = flatten();
    const error = new Error('Test error');
    abortedRead(true, (end: any, data: any) => {
      if (end) return;
    });
    abortedRead(error, (end: any, data: any) => {
      if (end) return;
      throw new Error('Expected error not thrown');
    });
  });
});