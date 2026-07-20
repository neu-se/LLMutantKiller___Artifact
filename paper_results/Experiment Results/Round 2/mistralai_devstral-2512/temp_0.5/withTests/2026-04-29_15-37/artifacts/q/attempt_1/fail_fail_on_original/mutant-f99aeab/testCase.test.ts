// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine mutation test", () => {
  it("should correctly capture stack traces when hasStacks is true", () => {
    // Force hasStacks to be true for this test
    const originalHasStacks = (Q as any).longStackSupport;
    (Q as any).longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      throw new Error("Test error");
    });

    // Capture the error and check if stack trace is properly formatted
    return promise.catch((error: any) => {
      // The stack trace should contain the error message and proper formatting
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("Test error");

      // Restore original state
      (Q as any).longStackSupport = originalHasStacks;
    });
  });
});