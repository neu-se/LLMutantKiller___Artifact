const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.longStackSupport", () => {
  it("should enable long stack traces when Q_DEBUG is set", () => {
    // Set Q_DEBUG environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // Create a new Q instance to ensure the environment variable is picked up
    const QInstance = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify that longStackSupport is enabled
    expect(QInstance.longStackSupport).toBe(true);

    // Clean up
    delete process.env.Q_DEBUG;
  });
});