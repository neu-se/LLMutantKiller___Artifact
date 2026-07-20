const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester function behavior", () => {
  it("should return the input value when no test is provided", () => {
    const input = "test data";
    const result = tester(undefined)(input);
    expect(result).toBe(input);
  });
});