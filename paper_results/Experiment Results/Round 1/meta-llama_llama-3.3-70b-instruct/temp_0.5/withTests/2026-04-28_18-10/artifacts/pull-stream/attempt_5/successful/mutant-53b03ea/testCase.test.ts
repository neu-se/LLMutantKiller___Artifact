import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it.skip('should return id function when test is not an object with a test function and prop returns false', () => {
    const test = { foo: 'bar' };
    const prop = jest.fn().mockReturnValue(false);
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    expect(result('data')).toBe('data');
  });
});