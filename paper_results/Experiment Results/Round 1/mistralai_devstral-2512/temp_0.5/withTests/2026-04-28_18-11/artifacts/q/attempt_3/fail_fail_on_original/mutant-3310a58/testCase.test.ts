const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Clear Q_DEBUG to ensure it's not set
    delete process.env.Q_DEBUG;

    // Import Q with Q_DEBUG not set
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithoutDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Check that long stack support is disabled when Q_DEBUG is not set
    const longStackSupportDisabled = !QWithoutDebug.longStackSupport;

    // Now set Q_DEBUG
    process.env.Q_DEBUG = "1";

    // Re-import Q with Q_DEBUG set
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Check that long stack support is enabled when Q_DEBUG is set
    const longStackSupportEnabled = QWithDebug.longStackSupport;

    // Restore original environment
    process.env = originalEnv;

    // The test should pass if:
    // 1. Long stack support was disabled when Q_DEBUG was not set
    // 2. Long stack support was enabled when Q_DEBUG was set
    expect(longStackSupportDisabled).toBe(true);
    expect(longStackSupportEnabled).toBe(true);
  });
});