const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should create partial application only for functions with exactly one parameter", () => {
    const funcWithOneParam = (x: any) => x;
    const funcWithTwoParams = (x: any, y: any) => x + y;
    const nonFunctionArg = { source: () => {} };

    const resultOneParam = pull(funcWithOneParam);
    const resultTwoParams = pull(funcWithTwoParams);
    const resultNonFunction = pull(nonFunctionArg);

    // Original code should create partial application only for funcWithOneParam
    expect(resultOneParam.length).toBe(0);
    expect(resultTwoParams.length).toBe(2);
    expect(resultNonFunction.length).toBe(2);
  });
});