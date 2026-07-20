import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise (not undefined) when called on a promise of an array", () => {
    const arrayPromise = Q([Q.resolve(1), Q.resolve(2)]);
    const result = arrayPromise.any();

    // In the original code, any(this) returns a promise
    // In the mutated code, the function body is empty, returning undefined
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    // A Q promise has an inspect method
    expect(typeof result.inspect).toBe("function");
  });
});