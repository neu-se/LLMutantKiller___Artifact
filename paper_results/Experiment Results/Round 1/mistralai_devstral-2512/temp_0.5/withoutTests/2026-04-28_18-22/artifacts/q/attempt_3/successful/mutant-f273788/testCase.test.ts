const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function", async () => {
    const testFn = (a: number, b: number) => a + b;
    const args = [2, 3];
    const result = await Q.fapply(testFn, args);
    expect(result).toBe(5);
  });
});