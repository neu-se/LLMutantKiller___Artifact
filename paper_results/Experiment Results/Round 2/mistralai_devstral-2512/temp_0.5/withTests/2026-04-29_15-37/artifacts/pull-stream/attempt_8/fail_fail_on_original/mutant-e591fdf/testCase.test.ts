const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should not create partial application when first argument is a function with zero parameters", () => {
    const funcWithZeroParams = () => {};
    const result = pull(funcWithZeroParams);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);
  });
});