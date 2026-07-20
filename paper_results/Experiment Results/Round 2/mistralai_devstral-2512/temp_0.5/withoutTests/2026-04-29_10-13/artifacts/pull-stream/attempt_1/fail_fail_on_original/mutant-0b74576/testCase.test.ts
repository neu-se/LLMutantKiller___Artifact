import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return the input value when test is not an object or function", () => {
    const input = "test input";
    const testFn = tester(input);
    const result = testFn(input);
    expect(result).toBe(input);
  });
});