const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q long stack support", () => {
  it("should only enable long stack support when process object exists and Q_DEBUG is set", () => {
    // Save original env
    const originalEnv = process.env.Q_DEBUG;

    // Test case 1: Process object exists and Q_DEBUG is set (should enable)
    process.env.Q_DEBUG = "1";

    // Clear module cache to get fresh Q instance
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
    const QWithProcess = require("../../../../../../../../../../../subject_repositories/q/q");

    // Verify long stack support IS enabled when process exists
    expect(QWithProcess.longStackSupport).toBe(true);

    // Test case 2: Process object exists but Q_DEBUG is not set (should not enable)
    delete process.env.Q_DEBUG;

    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
    const QNoDebug = require("../../../../../../../../../../../subject_repositories/q/q");

    // Verify long stack support is NOT enabled when Q_DEBUG is not set
    expect(QNoDebug.longStackSupport).toBe(false);

    // Restore original env
    process.env.Q_DEBUG = originalEnv;
  });
});