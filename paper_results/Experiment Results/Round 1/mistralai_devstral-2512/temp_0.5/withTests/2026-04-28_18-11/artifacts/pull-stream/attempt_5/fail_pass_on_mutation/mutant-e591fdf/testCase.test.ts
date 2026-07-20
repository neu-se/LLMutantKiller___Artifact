const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should create partial application only for functions with exactly one parameter", () => {
    const funcWithOneParam = (a: any) => a;
    const funcWithTwoParams = (a: any, b: any) => a + b;
    const funcWithZeroParams = () => 42;

    const resultOne = pull(funcWithOneParam);
    const resultTwo = pull(funcWithTwoParams);
    const resultZero = pull(funcWithZeroParams);

    expect(typeof resultOne).toBe('function');
    expect(resultTwo).toBe(funcWithTwoParams);
    expect(resultZero).toBe(funcWithZeroParams);
  });
});