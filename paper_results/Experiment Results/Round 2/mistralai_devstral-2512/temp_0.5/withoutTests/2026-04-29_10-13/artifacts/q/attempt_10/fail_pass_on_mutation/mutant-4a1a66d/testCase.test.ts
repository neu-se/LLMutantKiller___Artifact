const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should detect mutation by checking StopIteration condition and execution flow", async () => {
    let executionPath = 0;
    let conditionResult = false;

    const asyncFn = Q.async(function* () {
      executionPath = 1;
      conditionResult = (typeof StopIteration === "undefined");
      if (conditionResult) {
        executionPath = 2;
        const intermediate = yield Promise.resolve("step1");
        return intermediate + "step2";
      } else {
        executionPath = 3;
        return "mutated";
      }
    });

    const result = await asyncFn();
    expect(executionPath).toBe(2);
    expect(conditionResult).toBe(true);
    expect(result).toBe("step1step2");
  });
});