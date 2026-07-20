const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with non-function input", () => {
  it("should handle non-function input without throwing", () => {
    const nonFunctionInput = { source: () => {} };
    const result = pull(nonFunctionInput);
    expect(typeof result).toBe("function");
  });
});