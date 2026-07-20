import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const mockTest = {
      test: jest.fn((data) => data * 2)
    };

    const resultFn = tester(mockTest);
    const input = 5;
    const output = resultFn(input);

    expect(output).toBe(10);
    expect(mockTest.test).toHaveBeenCalledWith(input);
  });
});