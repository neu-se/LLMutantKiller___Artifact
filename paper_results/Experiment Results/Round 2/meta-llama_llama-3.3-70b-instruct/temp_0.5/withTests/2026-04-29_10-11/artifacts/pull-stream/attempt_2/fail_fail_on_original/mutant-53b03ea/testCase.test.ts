import { tester } from '../../util/tester';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: { test: jest.fn() } };
    const result = tester(test);
    result('data');
    expect(test.test.test).toHaveBeenCalledTimes(1);
    expect(test.test.test).toHaveBeenCalledWith('data');
  });

  it('should return the id function when test is not an object with a test function', () => {
    const test = {};
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return the id function when test is an object but does not have a test function', () => {
    const test = { foo: 'bar' };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
  });
});