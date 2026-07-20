import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester function behavior", () => {
  it("should return a function that calls test.test when test is an object with a test method", () => {
    const mockTest = {
      test: jest.fn((data) => data)
    };

    const result = tester(mockTest);
    expect(typeof result).toBe("function");

    const input = "test data";
    const output = result(input);
    expect(output).toBe(input);
    expect(mockTest.test).toHaveBeenCalledWith(input);
  });
});