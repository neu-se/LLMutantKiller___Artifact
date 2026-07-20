const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
  it("should fail when dispatch is called with empty string instead of 'apply'", () => {
    const testFn = (a: number, b: number) => a + b;
    const promise = Q(testFn).fcall(2, 3);
    return promise.then((result: number) => {
      expect(result).toBe(5);
    });
  });
});