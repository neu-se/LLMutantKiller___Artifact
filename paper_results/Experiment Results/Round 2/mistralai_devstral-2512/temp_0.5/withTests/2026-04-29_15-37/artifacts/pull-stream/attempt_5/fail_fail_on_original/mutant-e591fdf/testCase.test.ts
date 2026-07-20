const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should not create partial application when first argument is not a function", () => {
    const nonFunctionArg = { source: () => {} };
    const result = pull(nonFunctionArg);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);
  });
});