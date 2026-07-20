import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return input when given a non-test object", () => {
    const input = 42;
    const result = tester(input);
    expect(result).toBe(input);
  });
});