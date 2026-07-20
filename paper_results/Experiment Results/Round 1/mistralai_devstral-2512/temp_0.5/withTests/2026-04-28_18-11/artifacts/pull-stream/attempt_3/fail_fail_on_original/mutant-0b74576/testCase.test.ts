import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return identity function when test is not an object with test property', () => {
    const testValue = 42;
    const result = tester(testValue);
    expect(result(testValue)).toBe(testValue);
  });
});