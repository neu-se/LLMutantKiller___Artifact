import { tester } from '../../util/tester';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    result({ test: 'data' });
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith({ test: 'data' });
  });

  it('should return id function when test is not an object with a test function and prop returns false', () => {
    const test = { foo: 'bar' };
    const prop = jest.fn().mockReturnValue(false);
    const id = jest.fn().mockReturnValue('id');
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    expect(result('data')).toBe('data');
  });
});