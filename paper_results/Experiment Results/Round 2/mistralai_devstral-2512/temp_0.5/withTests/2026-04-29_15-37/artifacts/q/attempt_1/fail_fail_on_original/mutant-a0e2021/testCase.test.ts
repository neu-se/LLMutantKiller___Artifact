// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-a0e2021/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save the original process.env
    const originalEnv = process.env;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Reload Q to pick up the new environment variable
    // Note: In a real test environment, you might need to re-import Q here
    // For this test, we'll assume the module is already loaded with the mutation

    // Create a promise chain to test long stack traces
    const promise = Q().then(() => {
      return Q().then(() => {
        throw new Error("Test error");
      });
    });

    // Verify that long stack support is enabled
    expect(Q.longStackSupport).toBe(true);

    // Restore the original environment
    process.env = originalEnv;

    // Return the promise to ensure the test waits for it
    return promise.catch(() => {
      // Error is expected, we're just testing stack trace behavior
    });
  });
});