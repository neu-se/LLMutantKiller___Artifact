// Test case to detect the mutation in filterStackString function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter stack traces with internal and node frames", () => {
    // Create a scenario where we can observe the stack trace filtering behavior
    const error = new Error("Test error");
    const originalStack = error.stack || "";

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(error);

    // Force long stack traces to be enabled for this test
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    return promise
      .then(() => {
        throw new Error("Should not reach here");
      })
      .catch((err) => {
        // The stack trace should be filtered
        const filteredStack = err.stack;

        // Verify that the stack trace was processed
        // The mutation changes the logic from AND to OR in the filter condition
        // This test ensures the original behavior is preserved
        expect(filteredStack).not.toContain("q.js");
        expect(filteredStack).not.toContain("(module.js:");
        expect(filteredStack).not.toContain("(node.js:");

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      });
  });
});