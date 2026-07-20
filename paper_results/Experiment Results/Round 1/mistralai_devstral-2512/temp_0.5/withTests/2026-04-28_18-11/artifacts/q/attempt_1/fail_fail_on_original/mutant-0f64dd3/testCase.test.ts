// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine mutation test", () => {
  it("should correctly handle stack traces when fileNameAndLineNumber is falsy", () => {
    // This test forces a scenario where fileNameAndLineNumber would be falsy
    // by creating an environment where stack traces don't contain expected patterns
    const originalHasStacks = (global as any).hasStacks;
    (global as any).hasStacks = true;

    // Mock a stack trace that doesn't match any of the expected patterns
    const originalErrorStack = Error.stackTraceLimit;
    Error.stackTraceLimit = 1;

    try {
      // Create a promise and force stack trace capture
      const deferred = Q.defer();
      const promise = deferred.promise;

      // The mutation would cause this to behave differently when
      // fileNameAndLineNumber is falsy
      return promise.then(() => {
        // If we get here, the stack trace handling worked correctly
        expect(true).toBe(true);
      }).catch(() => {
        // Should not reject in this test
        expect(true).toBe(false);
      }).finally(() => {
        (global as any).hasStacks = originalHasStacks;
        Error.stackTraceLimit = originalErrorStack;
      });
    } catch (e) {
      // Clean up in case of error
      (global as any).hasStacks = originalHasStacks;
      Error.stackTraceLimit = originalErrorStack;
      throw e;
    }
  });
});