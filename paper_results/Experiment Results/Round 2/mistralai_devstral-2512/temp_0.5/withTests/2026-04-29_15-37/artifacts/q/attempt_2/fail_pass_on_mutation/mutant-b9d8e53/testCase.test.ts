// Test case to detect the mutation in the regex pattern for stack trace parsing
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing regex", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a promise chain that will generate stack traces
    // The mutation affects how line numbers are parsed from stack traces
    Q.longStackSupport = true;

    // Create a function that will appear in stack traces with multi-digit line numbers
    function testFunction() {
      throw new Error("Test error");
    }

    // Wrap in a promise to trigger stack trace generation
    const promise = Q.fcall(testFunction).then(null, (err: Error) => {
      // The stack should be properly filtered
      // The mutation would cause line numbers with 2+ digits to not match
      expect(err.stack).toBeDefined();
      expect(err.stack?.length).toBeGreaterThan(0);
      // Check that the stack contains the expected line number format
      expect(err.stack).toMatch(/testFunction.*\d{2,}:\d+/);
    });

    return promise;
  });
});