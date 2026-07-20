import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return a function that calls test.test when test is an object with a test method", () => {
    const mockTest = {
      test: (data: any) => `processed:${data}`
    };
    const result = tester(mockTest);
    expect(typeof result).toBe('function');
    expect(result('input')).toBe('processed:input');
  });
});