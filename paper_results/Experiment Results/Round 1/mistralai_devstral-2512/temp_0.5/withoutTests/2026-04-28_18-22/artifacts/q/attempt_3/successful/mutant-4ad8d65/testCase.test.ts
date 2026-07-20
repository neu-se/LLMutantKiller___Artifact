const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.try mutation test", () => {
  it("should correctly apply a function with arguments", () => {
    const testFn = (a: number, b: number) => a + b;
    return Q["try"](testFn, 2, 3).then((result: number) => {
      expect(result).toBe(5);
    });
  });
});