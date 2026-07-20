const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should correctly check process type before accessing process.env", () => {
    // Save the original process and process.env
    const originalProcess = global.process;
    const originalEnv = { ...process.env };

    // Test case 1: process is an object with Q_DEBUG set
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q1.longStackSupport).toBe(true);

    // Test case 2: process is not an object (mutated code will fail here)
    global.process = null;
    try {
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
      // Original code should handle this gracefully (longStackSupport remains false)
      // Mutated code will throw TypeError trying to access null.env
      expect(Q2.longStackSupport).toBe(false);
    } catch (e) {
      // If we get here, the mutated code threw an error
      global.process = originalProcess;
      process.env = originalEnv;
      throw new Error("Mutated code failed the process type check");
    }

    // Restore original process and environment
    global.process = originalProcess;
    process.env = originalEnv;
  });
});