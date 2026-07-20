import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = {
      test: jest.fn((data) => data),
    };
    const result = tester(test);
    expect(typeof result).toBe('function');
    result('test data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('test data');
  });
});