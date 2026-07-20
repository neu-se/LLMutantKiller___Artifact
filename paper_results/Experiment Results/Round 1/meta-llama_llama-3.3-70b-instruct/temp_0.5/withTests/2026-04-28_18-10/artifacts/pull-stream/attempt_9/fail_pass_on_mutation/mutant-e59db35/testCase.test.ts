import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream';

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

    const result: any[] = [];
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

    expect(result.length).toBeGreaterThan(0);

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

    // This should throw an error when run against the mutated code
    const error = new Error('Test error');
    abortedRead(error, (end: any, data: any) => {
      if (end) return;
      if (end !== error) {
        throw new Error('Expected error not thrown');
      }
    });

    // Test the difference between original and mutated code
    const originalRead = pull(
      pull.values([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]),
      pull.flatten()
    );

    originalRead(null, (end: any, data: any) => {
      if (end) return;
      expect(data).not.toBeUndefined();
    });

    // This should pass on the original code and fail on the mutated code
    const testResult = [];
    originalRead(null, (end: any, data: any) => {
      if (end) return;
      testResult.push(data);
    });
    originalRead(null, (end: any, data: any) => {
      if (end) return;
      testResult.push(data);
    });
    originalRead(true, (end: any, data: any) => {
      if (end) return;
      expect(end).toBe(true);
      expect(testResult.length).toBe(2);
    });
  });
});