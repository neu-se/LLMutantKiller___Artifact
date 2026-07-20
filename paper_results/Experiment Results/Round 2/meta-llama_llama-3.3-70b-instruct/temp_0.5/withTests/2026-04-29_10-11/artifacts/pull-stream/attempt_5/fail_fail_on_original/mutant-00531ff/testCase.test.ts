import * as tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const testObject = {
      test: () => {}
    };

    const result = tester.default(testObject);
    expect(typeof result).toBe('function');

    const testObjectMutated = {
      test: ''
    };

    expect(() => tester.default(testObjectMutated)).toThrowError();
  });
});