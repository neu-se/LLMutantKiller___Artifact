import { tester } from '../../../util/tester';

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
    expect(result).not.toBeNull();
    const test2 = { foo: 'bar' };
    const result2 = tester(test2);
    expect(result2).toBeDefined();
    expect(result2).not.toBeNull();
  });
});