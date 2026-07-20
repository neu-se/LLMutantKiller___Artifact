const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The key difference is in the valueOf implementation:
    // Original: if (inspected.state === "pending" || ...) return promise;
    // Mutated: if (inspected.state !== "pending" || ...) return promise;
    // This means for pending promises:
    // - Original returns the promise itself
    // - Mutated returns inspected.value (which is undefined for pending)

    const result = promise.valueOf();

    // This will pass on original (promise object) but fail on mutated (undefined)
    expect(result).toBe(promise);

    // Verify it's actually the promise by checking it has promise methods
    expect(result).toHaveProperty('then');
    expect(result).toHaveProperty('inspect');
  });
});