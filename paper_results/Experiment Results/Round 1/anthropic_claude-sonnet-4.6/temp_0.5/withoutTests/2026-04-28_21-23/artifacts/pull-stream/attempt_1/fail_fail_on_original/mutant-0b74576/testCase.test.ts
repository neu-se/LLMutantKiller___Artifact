import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester", () => {
  it("should return the identity function when no test is provided, passing through the input value", () => {
    const identityTester = tester(undefined);
    const result = identityTester("hello");
    expect(result).toBe("hello");
  });
});