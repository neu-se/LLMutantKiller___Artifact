import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter internal stack frames based on line numbers", () => {
    // Force long stack traces to be enabled for testing
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    // The mutation affects how internal stack frames are filtered
    // We need to verify that the filtering logic works correctly
    // by checking that internal Q frames are properly excluded
    let stackTrace: string | undefined;
    promise.catch((error: Error) => {
      stackTrace = error.stack;
    });

    // Use Q.done to ensure the error is processed
    Q.done(promise, () => {}, (error: Error) => {
      stackTrace = error.stack;
    });

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;

    // The test verifies that the stack trace filtering works correctly
    // The mutation would cause incorrect filtering of line numbers
    expect(stackTrace).toBeDefined();
    if (stackTrace) {
      // Check that internal Q frames are filtered out
      // This is a basic check - the actual filtering happens internally
      expect(stackTrace).not.toContain("q.js");
    }
  });
});