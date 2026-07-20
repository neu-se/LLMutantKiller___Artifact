const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.longStackSupport behavior", () => {
  it("should produce long stack traces with 'From previous event:' separator when Q_DEBUG is set", () => {
    // Set Q_DEBUG environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // Create a new Q instance to ensure the environment variable is picked up
    const QInstance = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a deferred promise
    const deferred = QInstance.defer();

    // Create a promise chain with multiple levels to test stack trace
    const promise = deferred.promise
      .then(() => { throw new Error("Test error"); })
      .then(() => { return "should not reach here"; });

    // Reject the deferred promise
    deferred.reject(new Error("Initial error"));

    // Handle the rejection and check for long stack traces
    return promise
      .catch((e: any) => {
        // Specifically check for the long stack trace separator
        expect(e.stack).toContain("From previous event:");
      })
      .finally(() => {
        // Clean up
        delete process.env.Q_DEBUG;
      });
  });
});