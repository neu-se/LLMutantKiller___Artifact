const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe('tester function behavior', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const mockTest = {
      test: jest.fn((data) => data)
    };

    const result = tester(mockTest);
    expect(typeof result).toBe('function');

    const input = { value: 42 };
    const output = result(input);
    expect(output).toEqual(input);
    expect(mockTest.test).toHaveBeenCalledWith(input);
  });
});