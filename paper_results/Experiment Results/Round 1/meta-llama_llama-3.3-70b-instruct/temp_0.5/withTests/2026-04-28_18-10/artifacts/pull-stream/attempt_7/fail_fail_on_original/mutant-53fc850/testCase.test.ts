import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return a function when test is an object with a test function and pass on the original code, fail on the mutated code', () => {
    const test = { test: () => {} };
    const result = tester(test);
    expect(typeof result).toBe('function');
    const data = 'test data';
    expect(result(data)).toBe(data);
    const test2 = { foo: 'bar' };
    const result2 = tester(test2);
    expect(result2).not.toBeDefined();
  });
});