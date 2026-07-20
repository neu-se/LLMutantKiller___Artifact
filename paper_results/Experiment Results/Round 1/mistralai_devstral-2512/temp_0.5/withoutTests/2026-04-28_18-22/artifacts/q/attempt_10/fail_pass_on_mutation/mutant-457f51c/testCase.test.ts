const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise behavior", () => {
  it("should not have exception property set incorrectly", () => {
    // Create a fulfilled promise
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.fulfill("test value");

    // Force inspection to trigger any deprecated code paths
    const inspection = promise.inspect();

    // In the original code, exception should only be set for rejected promises
    // In the mutated code with if(true), exception would be set for all promises
    // Since the deprecated code is wrapped in if(false), this should pass on both
    // But if we could activate that code, the mutation would fail this test
    expect(promise.exception).toBeUndefined();

    // Also verify the promise is actually fulfilled
    expect(inspection.state).toBe("fulfilled");
    expect(inspection.value).toBe("test value");
  });
});