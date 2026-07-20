const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
  it("should correctly call a function with arguments using fcall", () => {
    const testFn = (a: number, b: number) => a + b;
    const promise = Q.fcall(testFn, 2, 3);
    return promise.then((result: number) => {
      expect(result).toBe(5);
    });
  });
});