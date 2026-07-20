import { tester } from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const testObject = {
      test: () => {}
    };

    const result = tester(testObject);
    expect(typeof result).toBe('function');
  });
});