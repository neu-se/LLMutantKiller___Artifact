import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const testObject = {
      test: () => {}
    };

    const result1 = tester(testObject);
    expect(typeof result1).toBe('function');

    const testObjectMutated = {
      test: ''
    };

    const result2 = tester(testObjectMutated);
    expect(result2).toBeUndefined();
  });
});