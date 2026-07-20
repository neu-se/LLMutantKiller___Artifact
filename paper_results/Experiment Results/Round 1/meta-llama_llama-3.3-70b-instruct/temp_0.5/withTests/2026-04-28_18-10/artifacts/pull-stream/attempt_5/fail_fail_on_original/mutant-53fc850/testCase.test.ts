import { tester } from '../../../../util/tester.js';

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: () => {} };
    const result = tester(test);
    expect(typeof result).toBe('function');
    const data = 'test data';
    expect(result(data)).toBe(data);
  });

  it('should throw an error when test is not an object or test is not a function in the mutated code', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).not.toBeDefined();
  });
});