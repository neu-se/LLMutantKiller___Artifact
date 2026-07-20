const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when process.env.Q_DEBUG is truthy", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test with Q_DEBUG set to a truthy value
    process.env.Q_DEBUG = "1";

    // Clear the require cache and re-import Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Check if long stack support was enabled
    const longStackSupportEnabled = QWithDebug.longStackSupport;

    // Restore original environment
    process.env = originalEnv;

    // The test should pass if long stack support was enabled when Q_DEBUG was set to a truthy value
    expect(longStackSupportEnabled).toBe(true);
  });
});