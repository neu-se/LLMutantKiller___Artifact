// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-064841a/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces feature", () => {
  it("should capture stack traces with stackCounter when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will reject
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Reject the promise
    deferred.reject(error);

    // Wait for the promise to be rejected and capture the error
    let capturedError: Error | undefined;
    try {
      await deferred.promise;
    } catch (err: any) {
      capturedError = err;
    }

    // Verify that the error was captured
    expect(capturedError).toBeDefined();
    expect(capturedError!.message).toBe("Test error");

    // The key assertion: the stackCounter should be present when long stack support is enabled
    // In the mutated version, the stackCounter won't be set, so this will fail
    expect((capturedError as any).stackCounter).toBeDefined();
    expect((capturedError as any).stackCounter).toBeGreaterThan(0);

    // Clean up
    Q.longStackSupport = false;
  });
});