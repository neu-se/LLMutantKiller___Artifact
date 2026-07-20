const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env and Q.longStackSupport
    const originalEnv = { ...process.env };
    const originalLongStackSupport = Q.longStackSupport;

    // Set Q_DEBUG environment variable
    process.env.Q_DEBUG = "1";

    // Reset Q to re-evaluate the long stack support condition
    // We need to re-import Q to pick up the new environment variable
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Check if long stack support was enabled
    const longStackSupportEnabled = QWithDebug.longStackSupport;

    // Restore original environment and Q.longStackSupport
    process.env = originalEnv;
    Q.longStackSupport = originalLongStackSupport;

    // The test should pass if long stack support was enabled when Q_DEBUG was set
    expect(longStackSupportEnabled).toBe(true);
  });
});