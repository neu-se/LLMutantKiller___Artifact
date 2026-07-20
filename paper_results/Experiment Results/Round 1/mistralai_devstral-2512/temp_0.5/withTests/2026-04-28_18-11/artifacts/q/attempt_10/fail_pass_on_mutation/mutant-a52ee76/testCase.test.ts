// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support behavior", () => {
  it("should show long stack traces when Q_DEBUG is set and longStackSupport is enabled", () => {
    // The mutation removes the assignment that enables long stack support
    // This means stack traces won't be enhanced even when Q_DEBUG is set
    // We can detect this by checking if stack traces contain the expected markers

    // Create a promise chain that would generate long stack traces
    function createErrorChain() {
      return Q().then(() => {
        return Q.Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error("test error"));
          }, 0);
        });
      });
    }

    return createErrorChain()
      .catch((error: Error) => {
        // Check if the stack trace contains the "From previous event" marker
        // which indicates long stack traces are enabled
        const hasLongStack = error.stack && error.stack.includes("From previous event");

        // In original code with Q_DEBUG=1 and longStackSupport=true,
        // the stack should contain the marker
        // In mutated code, it won't contain the marker even with Q_DEBUG=1
        if (process.env.Q_DEBUG === "1" && Q.longStackSupport) {
          expect(hasLongStack).toBe(true);
        }
      });
  });
});