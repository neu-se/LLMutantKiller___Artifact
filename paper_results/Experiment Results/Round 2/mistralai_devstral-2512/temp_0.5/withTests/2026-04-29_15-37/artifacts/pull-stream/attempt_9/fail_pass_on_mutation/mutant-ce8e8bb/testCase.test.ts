const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with non-function argument", () => {
  it("should return the argument when it's not a function", () => {
    const nonFunctionArg = { value: 42 };
    const result = pull(nonFunctionArg);
    expect(result).toBe(nonFunctionArg);
  });
});