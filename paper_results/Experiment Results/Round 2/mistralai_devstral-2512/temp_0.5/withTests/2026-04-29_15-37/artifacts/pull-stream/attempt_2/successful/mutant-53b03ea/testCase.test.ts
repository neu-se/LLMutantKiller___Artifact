const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe('tester function behavior', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const mockTest = {
      test: jest.fn((data: any) => `processed_${data}`)
    };

    const testFn = tester(mockTest);
    const result = testFn('input_data');

    expect(mockTest.test).toHaveBeenCalledWith('input_data');
    expect(result).toBe('processed_input_data');
  });
});