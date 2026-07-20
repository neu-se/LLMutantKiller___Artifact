// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-fdc9c64/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly filter internal stack frames with mutated condition", async () => {
    // Create a scenario where we can test the stack filtering behavior
    // The mutation changes the condition from AND to OR for lineNumber checks
    // Original: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // Mutated: fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine

    // This test creates a promise chain that will generate stack traces
    // and verifies that internal frames are properly filtered
    const error = new Error("Test error");

    // Force long stack traces to be enabled for this test
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate stack frames
      // The key is to create frames that would be considered "internal"
      // based on the file name and line numbers
      const promise = Q.Promise<string>((resolve, reject) => {
        // This should create stack frames within the q.js file
        Q.delay(1).then(() => {
          reject(error);
        });
      });

      // Wait for the promise to reject and catch the error
      await promise.catch((e: Error) => {
        // The stack should be filtered to remove internal Q frames
        // With the mutation, more frames might be incorrectly included
        // because the OR condition is less restrictive
        if (e.stack) {
          // Check that the stack doesn't contain certain internal patterns
          // that should have been filtered out
          const hasInternalFrames = e.stack.includes("at ") &&
                                   (e.stack.includes("q.js") ||
                                    e.stack.includes("From previous event"));

          // The original code should filter out internal frames better
          // The mutated code might leave some internal frames in
          // This assertion is designed to fail with the mutation
          expect(hasInternalFrames).toBe(false);
        }
      });
    } finally {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});