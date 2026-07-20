const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should create partial application when first argument is a function with single parameter", () => {
    const funcWithOneParam = (x: any) => x;
    const result = pull(funcWithOneParam);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(1);
  });
});