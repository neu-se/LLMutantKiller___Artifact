const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should detect mutation by checking generator execution path", async () => {
    let executionPath = 0;

    const asyncFn = Q.async(function* () {
      executionPath = 1;
      if (typeof StopIteration === "undefined") {
        executionPath = 2;
        const value = yield Promise.resolve("step1");
        return value + "step2";
      } else {
        executionPath = 3;
        return "mutated";
      }
    });

    const result = await asyncFn();
    expect(executionPath).toBe(2);
    expect(result).toBe("step1step2");
  });
});