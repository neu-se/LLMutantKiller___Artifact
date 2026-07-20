const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.fapply", () => {
  it("should pass arguments correctly to the function", async () => {
    const testFn = (a: number, b: number) => a + b;
    const result = await Q.fapply(testFn, [2, 3]);
    expect(result).toBe(5);
  });
});