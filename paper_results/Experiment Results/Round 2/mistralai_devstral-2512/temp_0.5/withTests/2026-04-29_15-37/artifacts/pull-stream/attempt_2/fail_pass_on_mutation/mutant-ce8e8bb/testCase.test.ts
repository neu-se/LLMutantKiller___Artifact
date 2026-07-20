const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with non-function argument", () => {
  it("should handle non-function arguments correctly", () => {
    const nonFunctionArg = { value: 42 };
    const result = pull(nonFunctionArg);
    expect(result).toBe(nonFunctionArg);
  });
});