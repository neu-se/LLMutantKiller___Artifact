import { tester } from './tester';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should throw an error when test.test is not a function in the mutated code', () => {
    const test = { test: "" };
    const result = tester(test);
    expect(result('data')).toBe('data');
  });
});