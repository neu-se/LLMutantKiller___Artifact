import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return the identity function when given a non-test object", () => {
    const input = 42;
    const result = tester(input);
    const idResult = result(100);
    expect(idResult).toBe(100);
  });
});