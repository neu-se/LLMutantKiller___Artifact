const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should only create partial application for functions with exactly one parameter", () => {
    const funcWithOneParam = (a: any) => a;
    const funcWithTwoParams = (a: any, b: any) => a + b;
    const nonFunction = { test: "value" };

    const resultOne = pull(funcWithOneParam);
    const resultTwo = pull(funcWithTwoParams);
    const resultNonFunc = pull(nonFunction);

    expect(typeof resultOne).toBe('function');
    expect(resultOne.length).toBe(1);
    expect(resultTwo).toBe(funcWithTwoParams);
    expect(resultNonFunc).toBe(nonFunction);
  });
});