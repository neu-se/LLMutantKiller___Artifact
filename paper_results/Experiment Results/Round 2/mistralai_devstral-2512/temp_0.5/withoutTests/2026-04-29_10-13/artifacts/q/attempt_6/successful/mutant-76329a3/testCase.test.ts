const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fbind", () => {
  it("should return a function that when called returns a promise", () => {
    const fn = function(a: number, b: number) {
      return a + b;
    };
    const boundFn = Q.fbind(fn, undefined, 1);
    const result = boundFn(2);
    expect(result).toBeDefined();
    expect(typeof result.then).toBe('function');
  });
});