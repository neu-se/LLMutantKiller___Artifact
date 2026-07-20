import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a Q promise when called on a promise instance", () => {
    const promiseInstance = Q.resolve([1, 2, 3]);
    const result = promiseInstance.any();
    // In the original code, .any() returns any(this) which is a Q promise
    // In the mutated code, .any() returns undefined
    expect(result).not.toBeUndefined();
    expect(Q.isPromise(result)).toBe(true);
  });
});