const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return a function that returns input when test is a number", () => {
    const testFn = tester(42);
    const input = { x: 1 };
    const result = testFn(input);
    expect(result).toBe(input);
  });
});