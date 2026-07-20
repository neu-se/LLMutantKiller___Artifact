import { tester } from '../../util/tester';

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: { test: () => {} } };
    const result = tester(test);
    expect(typeof result).toBe('function');
  });

  it('should return a function when test is not an object with a test function', () => {
    const test = {};
    const result = tester(test);
    expect(typeof result).toBe('function');
  });
});