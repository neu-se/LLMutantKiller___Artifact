import { tester } from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should not call test.test when test is not an object with a test function', () => {
    const test = { foo: 'bar' };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
    result('data');
    expect(test.test).not.toBeDefined();
  });
});