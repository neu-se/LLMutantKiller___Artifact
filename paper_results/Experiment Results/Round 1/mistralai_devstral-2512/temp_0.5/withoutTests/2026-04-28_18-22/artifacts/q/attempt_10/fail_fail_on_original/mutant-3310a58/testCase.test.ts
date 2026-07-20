const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Clear any existing Q_DEBUG
    delete process.env.Q_DEBUG;

    // First verify default behavior (should be false)
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QDefault = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(QDefault.longStackSupport).toBe(false);

    // Now set Q_DEBUG and verify it enables long stack support
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore the original process.env
    process.env = originalEnv;
  });
});