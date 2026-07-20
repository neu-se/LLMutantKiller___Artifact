import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should return the id function when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    expect(result('input')).toBe('input');
  });

  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    result('input');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('input');
  });
});