const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save original env
    const originalEnv = { ...process.env };

    // Clear Q_DEBUG to ensure it's not set
    delete process.env.Q_DEBUG;

    // Reset Q module to pick up new env
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify long stack support is NOT enabled when Q_DEBUG is not set
    expect(Q1.longStackSupport).toBe(false);

    // Set Q_DEBUG
    process.env.Q_DEBUG = "1";

    // Reset Q module to pick up new env
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify long stack support is enabled when Q_DEBUG is set
    expect(Q2.longStackSupport).toBe(true);

    // Restore original env
    process.env = originalEnv;
  });
});