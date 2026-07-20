const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save original env
    const originalEnv = { ...process.env };

    // Set Q_DEBUG
    process.env.Q_DEBUG = "1";

    // Reset Q module to pick up new env
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify long stack support is enabled
    expect(Q.longStackSupport).toBe(true);

    // Restore original env
    process.env = originalEnv;
  });
});