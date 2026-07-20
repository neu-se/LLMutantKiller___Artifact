// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with null/undefined method name", () => {
  it("should treat null method name as apply when post is called", () => {
    const testFn = (a: number, b: number, c: number) => a + b + c;
    const promise = Q(testFn).post(null, [1, 2, 3]);

    return promise.then((result: number) => {
      expect(result).toBe(6);
    });
  });
});