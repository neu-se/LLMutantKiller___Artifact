const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending and not the inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Store the original valueOf result
    const originalResult = promise.valueOf();

    // The original code should return the promise itself when pending
    expect(originalResult).toBe(promise);

    // Now fulfill the promise and check valueOf again
    deferred.resolve(42);
    const fulfilledResult = promise.valueOf();

    // After fulfillment, valueOf should return the fulfillment value (42)
    expect(fulfilledResult).toBe(42);

    // This test ensures the mutation is caught because:
    // 1. Original code returns promise when pending, value when fulfilled
    // 2. Mutated code would return value when pending (undefined) and value when fulfilled
    // The second expectation would fail on mutated code
  });
});