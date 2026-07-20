const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should create partial application only for functions with exactly one parameter", () => {
    const funcWithOneParam = (a: any) => a;
    const funcWithZeroParams = () => 42;

    const resultOne = pull(funcWithOneParam);
    const resultZero = pull(funcWithZeroParams);

    expect(typeof resultOne).toBe('function');
    expect(resultOne.length).toBe(1);
    expect(resultZero).toBe(funcWithZeroParams);
  });
});