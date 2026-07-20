import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return the input value when test is not an object with test property', () => {
    const inputValue = 42;
    const result = tester(inputValue);
    expect(result(inputValue)).toBe(inputValue);
  });
});