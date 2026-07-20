import { tester } from '../../../util/tester';

describe('tester function', () => {
  it('should return the id function when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });

  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: (data: any) => data };
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });

  it('should return a function that returns the input when test is an object with a test function that throws an error', () => {
    const test = { test: (data: any) => { throw new Error(); } };
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });
});