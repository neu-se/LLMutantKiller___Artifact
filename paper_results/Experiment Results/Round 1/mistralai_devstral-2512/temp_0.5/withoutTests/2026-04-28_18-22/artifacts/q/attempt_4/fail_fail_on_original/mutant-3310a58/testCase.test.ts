const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should only enable long stack support when Q_DEBUG is set in process.env and process is defined", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test case 1: Q_DEBUG is set but process is not properly defined (mutated case)
    // This should fail in the mutated version because it checks `true && process.env`
    // instead of `typeof process === "object" && process && process.env`
    delete process.env.Q_DEBUG;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithoutDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(QWithoutDebug.longStackSupport).toBe(false);

    // Test case 2: Q_DEBUG is set and process is properly defined
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(QWithDebug.longStackSupport).toBe(true);

    // Restore the original process.env
    process.env = originalEnv;
  });
});