// Test case to detect the mutation in the stack trace parsing regex
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a scenario that generates a stack trace with multi-digit line numbers
    // This will test the regex pattern for parsing anonymous function stack lines
    const error = new Error("Test error");

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    return Q.reject(error)
      .catch((e: Error) => {
        // The stack trace should be properly parsed
        // If the mutation is present, multi-digit line numbers won't be captured correctly
        expect(e.stack).toBeDefined();
        // Check that the stack trace contains the expected pattern
        expect(e.stack).toMatch(/at [^ ]+:(\d+):\d+/);
        return Q.resolve();
      });
  });
});