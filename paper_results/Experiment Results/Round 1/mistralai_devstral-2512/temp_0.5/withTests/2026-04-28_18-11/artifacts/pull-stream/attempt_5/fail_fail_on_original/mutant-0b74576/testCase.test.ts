import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return identity function when test is null', () => {
    const result = tester(null);
    expect(typeof result).toBe('function');
    expect(result(42)).toBe(42);
  });
});