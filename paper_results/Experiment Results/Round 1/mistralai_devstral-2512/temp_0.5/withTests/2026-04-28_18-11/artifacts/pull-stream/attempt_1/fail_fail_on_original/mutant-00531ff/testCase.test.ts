import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const mockTest = {
      test: jest.fn((data: any) => data)
    };
    const result = tester(mockTest);
    expect(typeof result).toBe('function');
    const testData = { value: 42 };
    const output = result(testData);
    expect(output).toEqual(testData);
    expect(mockTest.test).toHaveBeenCalledWith(testData);
  });
});