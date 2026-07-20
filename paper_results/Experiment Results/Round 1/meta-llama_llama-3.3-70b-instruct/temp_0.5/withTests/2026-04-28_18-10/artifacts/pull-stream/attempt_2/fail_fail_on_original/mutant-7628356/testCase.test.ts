import { tester } from '../../../util/tester';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should not return a function when test is not an object', () => {
    const test = "";
    const result = tester(test);
    expect(result).not.toBeInstanceOf(Function);
  });
});