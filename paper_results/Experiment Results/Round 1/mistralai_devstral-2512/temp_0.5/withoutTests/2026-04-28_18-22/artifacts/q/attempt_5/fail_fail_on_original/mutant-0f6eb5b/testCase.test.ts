const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.longStackSupport behavior", () => {
  it("should produce long stack traces when Q_DEBUG is set and promise is rejected", async () => {
    // Set Q_DEBUG environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // Create a new Q instance to ensure the environment variable is picked up
    const QInstance = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a promise chain that will reject
    const error = new Error("Test error");
    const rejectedPromise = QInstance.reject(error);

    // Force the promise to be handled to trigger stack trace generation
    try {
      await rejectedPromise;
    } catch (e) {
      // Check if the error stack contains the long stack trace separator
      expect(e.stack).toContain("From previous event:");
    }

    // Clean up
    delete process.env.Q_DEBUG;
  });
});