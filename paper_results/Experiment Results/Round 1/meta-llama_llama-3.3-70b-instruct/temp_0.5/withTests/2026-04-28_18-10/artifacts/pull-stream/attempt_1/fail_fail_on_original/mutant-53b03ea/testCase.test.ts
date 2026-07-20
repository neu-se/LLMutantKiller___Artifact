import { tester } from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should return the prop function when test is not an object with a test function', () => {
    const test = {};
    const prop = jest.fn();
    const result = tester(test);
    result('data');
    expect(prop).toHaveBeenCalledTimes(1);
    expect(prop).toHaveBeenCalledWith(test);
  });

  it('should return the id function when prop returns', () => {
    const test = {};
    const prop = jest.fn().mockReturnValue(false);
    const id = jest.fn().mockReturnValue('id');
    const result = tester(test);
    expect(result('data')).toBe('id');
  });
});