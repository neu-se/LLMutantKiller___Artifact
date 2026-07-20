import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should behave differently for the original and mutated code', () => {
    // Original code: 'object' === typeof key && 'function' === typeof key.exec
    // Mutated code: "" === typeof key && 'function' === typeof key.exec

    // Test case to expose the mutation
    const key = /test/;
    const data = 'test string';

    // In the original code, this should return 'test string'
    const originalResult = prop(key)(data);

    // In the mutated code, this should return the key itself (/test/)
    const mutatedResult = prop(key)(data);

    // The mutation changes the behavior of the prop function when the key is a RegExp object
    // So, we can write a test to check if the function returns the expected result
    expect(originalResult).not.toBe(key);
    expect(mutatedResult).toBe(key);
  });
});