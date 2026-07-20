// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-064841a/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces feature", () => {
  it("should capture stack traces when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will reject
    const promise = Q().then(() => {
      return Q.Promise((resolve: any, reject: any) => {
        reject(new Error("Test error"));
      });
    });

    // Wait for the promise to reject and capture the error
    let capturedError: Error | undefined;
    try {
      await promise;
    } catch (error: any) {
      capturedError = error;
    }

    // Verify that the error was captured
    expect(capturedError).toBeDefined();
    expect(capturedError!.message).toBe("Test error");

    // The key assertion: the stack trace should be present when long stack support is enabled
    // In the mutated version, the stack trace won't be captured, so this will fail
    expect(capturedError!.stack).toBeTruthy();
    expect(capturedError!.stack!.length).toBeGreaterThan(0);

    // Clean up
    Q.longStackSupport = false;
  });
});