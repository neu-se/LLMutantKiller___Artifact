import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf deprecated behavior", () => {
  it("should not expose exception property for fulfilled promises via valueOf", () => {
    const fulfilledPromise = Q(42);

    // The mutation changes the condition from checking state to always true
    // This would incorrectly expose exception property even for fulfilled promises
    // We test this through the deprecated valueOf method which uses the same condition
    const result = fulfilledPromise.valueOf();

    // For fulfilled promises, valueOf should return the promise itself (not the value)
    // This behavior is deprecated but still present in the code
    expect(result).toBe(fulfilledPromise);
    expect(result.exception).toBeUndefined();
  });
});