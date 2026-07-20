import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return undefined when mutated (empty function) vs a promise when original", () => {
    const arrayPromise = Q([Q.resolve(1), Q.resolve(2)]);
    const result = arrayPromise.any();
    // Original: returns a promise (truthy object with .then)
    // Mutated: returns undefined
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});