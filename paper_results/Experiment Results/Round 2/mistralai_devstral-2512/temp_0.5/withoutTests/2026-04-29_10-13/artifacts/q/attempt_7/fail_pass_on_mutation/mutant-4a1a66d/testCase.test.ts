const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with generator", () => {
  it("should detect mutation by checking StopIteration behavior", async () => {
    let executionPath = 0;

    const asyncFn = Q.async(function* () {
      executionPath = 1;
      if (typeof StopIteration === "undefined") {
        executionPath = 2;
        return yield Promise.resolve("original");
      } else {
        executionPath = 3;
        return yield Promise.resolve("mutated");
      }
    });

    const result = await asyncFn();
    expect(executionPath).toBe(2);
    expect(result).toBe("original");
  });
});