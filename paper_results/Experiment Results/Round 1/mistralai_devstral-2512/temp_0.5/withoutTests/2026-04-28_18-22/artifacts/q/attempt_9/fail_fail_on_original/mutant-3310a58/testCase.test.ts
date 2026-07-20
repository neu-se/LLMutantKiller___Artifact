const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should correctly evaluate process.env.Q_DEBUG condition", () => {
    // Save the original process
    const originalProcess = { ...global.process };

    // Test case 1: process exists but is null
    global.process = null;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q1.longStackSupport).toBe(false);

    // Test case 2: process exists but env is null
    global.process = { env: null };
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q2.longStackSupport).toBe(false);

    // Test case 3: process exists with proper env but Q_DEBUG not set
    global.process = { env: {} };
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q3 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q3.longStackSupport).toBe(false);

    // Test case 4: process exists with Q_DEBUG set
    global.process = { env: { Q_DEBUG: "1" } };
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q4 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q4.longStackSupport).toBe(true);

    // Restore original process
    global.process = originalProcess;
  });
});