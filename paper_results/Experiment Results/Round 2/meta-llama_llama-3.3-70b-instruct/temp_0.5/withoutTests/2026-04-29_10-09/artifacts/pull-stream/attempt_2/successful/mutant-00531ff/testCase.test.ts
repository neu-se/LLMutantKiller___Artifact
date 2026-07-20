import * as testerModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = {
      test: jest.fn(() => 'test result'),
    };
    const tester = testerModule.default;
    const result = tester(test);
    expect(typeof result).toBe('function');
    const data = 'some data';
    expect(result(data)).toBe('test result');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith(data);
  });
});