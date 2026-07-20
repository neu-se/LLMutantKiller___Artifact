import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise when called on a promise instance wrapping an array", () => {
    const promise = Q([Q.resolve(1), Q.resolve(2)]);
    const result = promise.any();
    
    // In the original code, result is a promise (has .then method)
    // In the mutated code, result is undefined
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});