const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nfapply", () => {
  it("should resolve with the result of applying the function with the given arguments", async () => {
    const testFn = (a: number, b: number, callback: (err: any, result: number) => void) => {
      callback(null, a + b);
    };

    const result = await Q.nfapply(testFn, [2, 3]);
    expect(result).toBe(5);
  });
});