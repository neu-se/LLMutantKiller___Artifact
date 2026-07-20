const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should properly handle generator execution flow", async () => {
    let executionPath = 0;

    const asyncFn = Q.async(function* () {
      executionPath = 1;
      if (typeof StopIteration === "undefined") {
        executionPath = 2;
        return "original";
      } else {
        executionPath = 3;
        return "mutated";
      }
    });

    const result = await asyncFn();
    expect(executionPath).toBe(2);
    expect(result).toBe("original");
  });
});