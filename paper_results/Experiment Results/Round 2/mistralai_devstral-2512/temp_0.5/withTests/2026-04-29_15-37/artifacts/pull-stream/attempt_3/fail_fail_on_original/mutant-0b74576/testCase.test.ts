import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return the identity function when given a non-test object", () => {
    const result = tester(42);
    expect(typeof result).toBe('function');
    expect(result(100)).toBe(100);
  });
});