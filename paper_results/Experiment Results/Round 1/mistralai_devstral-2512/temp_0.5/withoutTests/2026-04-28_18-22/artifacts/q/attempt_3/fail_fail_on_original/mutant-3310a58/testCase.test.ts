const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Reset Q to pick up the new environment variable
    // We need to re-import Q to ensure the module is re-evaluated with the new env
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify that long stack support is enabled
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore the original process.env
    process.env = originalEnv;
  });
});