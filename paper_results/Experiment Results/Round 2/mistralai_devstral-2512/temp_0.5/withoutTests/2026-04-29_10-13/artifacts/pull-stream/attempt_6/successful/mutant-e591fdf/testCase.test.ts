const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with non-function input", () => {
  it("should not create partial application when first argument is not a function", () => {
    const nonFunctionInput = { length: 1 };
    const result = pull(nonFunctionInput);
    expect(typeof result).toBe("object");
    expect(result).not.toBeInstanceOf(Function);
  });
});