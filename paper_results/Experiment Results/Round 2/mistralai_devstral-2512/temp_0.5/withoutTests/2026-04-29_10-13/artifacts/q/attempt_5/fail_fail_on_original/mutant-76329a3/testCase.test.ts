const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fbind", () => {
  it("should return a function that resolves to the expected result", () => {
    const fn = function(a: number, b: number) {
      return a + b;
    };
    const boundFn = Q.fbind(fn, undefined, 1);
    return boundFn(2).then((result: number) => {
      expect(result).toBe(3);
    });
  });
});