// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // Store original environment
    const originalEnv = process.env.Q_DEBUG;

    // Set environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // We need to test the actual behavior that would be affected by long stack support
    // Create a promise chain that would generate different stack traces
    // when long stack support is enabled vs disabled

    // Create a function that will appear in stack traces
    function createErrorWithStack() {
      return Q.reject(new Error("test error"));
    }

    // The mutation removes the assignment that enables long stack support
    // This means stack traces won't be enhanced even when Q_DEBUG is set
    // We can detect this by checking if the stack trace contains the expected markers

    return createErrorWithStack()
      .catch((error) => {
        // Check if long stack support was actually enabled
        // When enabled, stack traces should contain "From previous event" markers
        const hasLongStack = error.stack && error.stack.includes("From previous event");

        // In original code with Q_DEBUG=1, long stack support should be enabled
        // In mutated code, it won't be enabled even with Q_DEBUG=1
        expect(hasLongStack).toBe(true);

        // Clean up
        process.env.Q_DEBUG = originalEnv;
      });
  });
});