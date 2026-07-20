import { tester } from '../../../util/tester';

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: () => {} };
    const result = tester(test);
    expect(typeof result).toBe('function');
    const data = 'test data';
    expect(result(data)).toBe(data);
  });

  it('should return id function when test is not an object or test is not a function', () => {
    const test = { foo: 'bar' };
    const result = tester(test);
    const data = 'test data';
    expect(result(data)).toBe(data);
  });
});