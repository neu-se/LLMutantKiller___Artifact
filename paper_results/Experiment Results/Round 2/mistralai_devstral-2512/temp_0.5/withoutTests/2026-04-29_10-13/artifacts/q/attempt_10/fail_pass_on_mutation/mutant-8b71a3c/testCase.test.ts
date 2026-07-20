const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition in valueOf from:
    // if (inspected.state === "pending" || ...)
    // to:
    // if (inspected.state !== "pending" || ...)
    // For pending promises, this means:
    // Original: returns the promise itself
    // Mutated: returns inspected.value (undefined)

    const result = promise.valueOf();

    // This assertion will:
    // - PASS on original code (returns promise object)
    // - FAIL on mutated code (returns undefined)
    expect(result).toBe(promise);

    // Additional verification that we got the promise object
    expect(result).toBeInstanceOf(Q.makePromise);
  });
});