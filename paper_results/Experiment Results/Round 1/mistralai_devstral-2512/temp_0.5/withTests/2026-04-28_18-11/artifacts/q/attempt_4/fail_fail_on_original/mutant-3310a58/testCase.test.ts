const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should correctly evaluate Q_DEBUG environment variable", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test 1: When Q_DEBUG is not set, longStackSupport should be false
    delete process.env.Q_DEBUG;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q1.longStackSupport).toBe(false);

    // Test 2: When Q_DEBUG is set to "1", longStackSupport should be true
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q2.longStackSupport).toBe(true);

    // Test 3: When Q_DEBUG is set to empty string, longStackSupport should be false
    process.env.Q_DEBUG = "";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q3.longStackSupport).toBe(false);

    // Test 4: When Q_DEBUG is set to "0", longStackSupport should be false
    process.env.Q_DEBUG = "0";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q4 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q4.longStackSupport).toBe(false);

    // Restore original environment
    process.env = originalEnv;
  });
});