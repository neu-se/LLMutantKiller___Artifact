const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race mutation test", () => {
  it("should handle array with rejected promise correctly", () => {
    const promise1 = Q.reject(new Error("test error"));
    const promise2 = Q.resolve(42);
    return Q.race([promise1, promise2]).then(
      (result: number) => {
        expect(result).toBe(42);
      },
      (error: Error) => {
        throw error;
      }
    );
  });
});