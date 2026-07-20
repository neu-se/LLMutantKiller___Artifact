import { tester } from '../../../../util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should return the id function when test.test is not a function', () => {
    const test = { test: "" };
    const result = tester(test);
    const output = result('data');
    expect(output).toBe('data');
  });
});