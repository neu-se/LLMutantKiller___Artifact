const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fbind", () => {
  it("should return a function that can be called with additional arguments", () => {
    const fn = function(a: number, b: number, c: number) {
      return a + b + c;
    };
    const boundFn = Q.fbind(fn, undefined, 1, 2);
    return boundFn(3).then((result: number) => {
      expect(result).toBe(6);
    });
  });
});