import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return a function that returns the input when test is not an object with test property', () => {
    const testValue = 42;
    const resultFn = tester(testValue);
    const result = resultFn(testValue);
    expect(result).toBe(testValue);
  });
});