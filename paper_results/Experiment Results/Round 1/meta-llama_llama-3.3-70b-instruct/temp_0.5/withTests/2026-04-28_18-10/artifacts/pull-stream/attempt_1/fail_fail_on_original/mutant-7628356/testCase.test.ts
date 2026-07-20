import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should return the result of prop(test) when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).toBe(test);
  });
});