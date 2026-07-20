import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior for rejected promises", () => {
  it("should return the promise itself when valueOf is called on a rejected promise", () => {
    const error = new Error("test error");
    const rejected = Q.reject(error);
    // For a rejected promise, valueOf() should return the promise itself, not undefined
    const result = rejected.valueOf();
    expect(result).toBe(rejected);
  });
});