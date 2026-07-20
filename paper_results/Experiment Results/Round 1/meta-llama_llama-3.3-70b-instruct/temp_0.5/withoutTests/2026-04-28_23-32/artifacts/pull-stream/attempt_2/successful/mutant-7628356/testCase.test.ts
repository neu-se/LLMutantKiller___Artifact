import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = {
      test: jest.fn(() => 'test result'),
    };
    const result = tester(test);
    expect(typeof result).toBe('function');
    const data = 'test data';
    expect(result(data)).toBe('test result');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith(data);
  });
});