import { tester } from '../../../util/tester.js';

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: () => {} };
    const result = tester(test);
    expect(typeof result).toBe('function');
  });

  it('should return id function when test is not an object or test is not a function', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).toBeDefined();
  });

  it('should fail when test is an object but not a function in the mutated code', () => {
    const test = { foo: 'bar' };
    const result = tester(test);
    expect(result).toBeUndefined();
  });
});