import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return identity function when test is a non-object value', () => {
    const result = tester(42);
    expect(typeof result).toBe('function');
    expect(result(42)).toBe(42);
  });
});