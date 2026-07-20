import { tester } from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester';
import { values } from '../';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should return prop(test) when test is not an object with a test function', () => {
    const test = {};
    const prop = jest.fn();
    const result = tester(test);
    expect(result).toBe(prop(test));
  });

  it('should return id when prop(test) is falsy', () => {
    const test = {};
    const prop = jest.fn().mockReturnValue(false);
    const id = jest.fn();
    const result = tester(test);
    expect(result).toBe(id);
  });
});