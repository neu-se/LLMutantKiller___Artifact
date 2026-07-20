import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return identity function when test is undefined', () => {
    const result = tester(undefined);
    expect(result(42)).toBe(42);
  });
});