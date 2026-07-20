import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return test.test function when test is an object with test function', () => {
    const testObj = {
      test: (data: any) => `processed_${data}`
    };
    const result = tester(testObj);
    expect(typeof result).toBe('function');
    expect(result('input')).toBe('processed_input');
  });
});