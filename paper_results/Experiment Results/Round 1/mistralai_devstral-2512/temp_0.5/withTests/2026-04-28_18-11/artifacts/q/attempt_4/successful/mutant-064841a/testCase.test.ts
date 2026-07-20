// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-064841a/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces feature", () => {
  it("should capture stack traces on promise objects when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deferred promise
    const deferred = Q.defer();

    // Reject the promise with an error
    const error = new Error("Test error");
    deferred.reject(error);

    // Wait a bit to allow the promise to process
    await Q.delay(10);

    // Inspect the promise to check for stack trace properties
    const inspection = deferred.promise.inspect();

    // The key assertion: when long stack support is enabled, the promise should have stack properties
    // In the mutated version, these properties won't be set
    expect(inspection.state).toBe("rejected");
    expect(inspection.reason).toBe(error);

    // Check if the promise object itself has stack properties
    const promiseAny = deferred.promise as any;
    expect(promiseAny.stack).toBeDefined();
    expect(promiseAny.stackCounter).toBeDefined();

    // Clean up
    Q.longStackSupport = false;
  });
});