const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save original env
    const originalEnv = process.env.Q_DEBUG;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Clear module cache to get fresh Q instance
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q");

    // Verify long stack support is enabled
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore original env
    process.env.Q_DEBUG = originalEnv;
  });
});