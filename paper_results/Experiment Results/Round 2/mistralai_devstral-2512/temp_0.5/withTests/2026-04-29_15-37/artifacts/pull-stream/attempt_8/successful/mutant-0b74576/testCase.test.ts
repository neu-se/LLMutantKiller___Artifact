import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return identity function when given a non-object value", () => {
    const result = tester(undefined);
    expect(typeof result).toBe('function');
    expect(result(100)).toBe(100);
  });
});