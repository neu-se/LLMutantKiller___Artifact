const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should create partial application only when first argument is a function with exactly one parameter", () => {
    const funcWithOneParam = (a: any) => a;
    const nonFunction = { test: "value" };

    const resultFunc = pull(funcWithOneParam);
    const resultNonFunc = pull(nonFunction);

    expect(typeof resultFunc).toBe('function');
    expect(resultFunc.length).toBe(1);
    expect(resultNonFunc).toBe(nonFunction);
  });
});