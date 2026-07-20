const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return a function that returns the input when given a non-object, non-function test", () => {
    const testFn = tester("any string");
    expect(typeof testFn).toBe("function");
    expect(testFn("input")).toBe("input");
  });
});