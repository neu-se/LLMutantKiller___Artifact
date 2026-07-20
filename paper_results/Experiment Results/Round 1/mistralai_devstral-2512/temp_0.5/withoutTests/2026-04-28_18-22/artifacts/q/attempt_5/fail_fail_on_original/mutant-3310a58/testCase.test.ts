const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support only when process.env.Q_DEBUG is set", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Clear Q_DEBUG to test default behavior
    delete process.env.Q_DEBUG;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QDefault = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(QDefault.longStackSupport).toBe(false);

    // Set Q_DEBUG and verify it enables long stack support
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore the original process.env
    process.env = originalEnv;
  });
});