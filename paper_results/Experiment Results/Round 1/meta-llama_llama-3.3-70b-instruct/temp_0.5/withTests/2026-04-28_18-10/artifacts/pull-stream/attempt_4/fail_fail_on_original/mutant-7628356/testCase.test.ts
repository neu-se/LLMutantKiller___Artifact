import { tester } from "../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(typeof result).toBe('function');
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should return id when test is not an object', () => {
    const test = "";
    const result = tester(test);
    expect(result).not.toBeInstanceOf(Function);
    expect(result).toBeUndefined();
  });

  it('should fail when test is an empty string in mutated code', () => {
    const test = "";
    const result = tester(test);
    expect(result).not.toBeInstanceOf(Function);
    expect(result).toBeUndefined();
  });
});