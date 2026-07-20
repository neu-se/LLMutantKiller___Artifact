const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support only when process is an object and Q_DEBUG is set", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test 1: Set Q_DEBUG and verify long stack support is enabled
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q1.longStackSupport).toBe(true);

    // Test 2: Remove Q_DEBUG and verify long stack support is disabled
    delete process.env.Q_DEBUG;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q2.longStackSupport).toBe(false);

    // Test 3: Set Q_DEBUG to empty string and verify long stack support is disabled
    process.env.Q_DEBUG = "";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q3.longStackSupport).toBe(false);

    // Restore original environment
    process.env = originalEnv;
  });
});