const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fbind", () => {
  it("should bind arguments and context correctly", () => {
    const context = { value: 42 };
    const fn = function(this: any, a: number, b: number) {
      return this.value + a + b;
    };
    const boundFn = Q.fbind(fn, context, 1);
    return boundFn(2).then((result: number) => {
      expect(result).toBe(45);
    });
  });
});