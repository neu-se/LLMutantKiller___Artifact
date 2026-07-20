import { tester } from "../../../../../../../../subject_repositories/pull-stream/util/tester";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(typeof result).toBe('function');
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should return id when test is an empty string', () => {
    const test = "";
    const result = tester(test);
    expect(result).not.toBeInstanceOf(Function);
    expect(result).toBeUndefined();
  });
});