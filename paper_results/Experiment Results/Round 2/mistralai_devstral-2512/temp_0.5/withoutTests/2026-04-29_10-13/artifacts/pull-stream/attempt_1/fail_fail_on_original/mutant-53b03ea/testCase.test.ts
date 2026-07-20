import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should use test.test when test is an object with a test function", () => {
    const mockTest = {
      test: (data: any) => `processed:${data}`
    };
    const testFn = tester(mockTest);
    const result = testFn("input");
    expect(result).toBe("processed:input");
  });
});