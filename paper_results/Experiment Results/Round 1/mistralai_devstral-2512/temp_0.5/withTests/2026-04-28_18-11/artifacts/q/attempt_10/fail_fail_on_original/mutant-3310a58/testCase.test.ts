const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should only enable long stack support when both process is an object and Q_DEBUG is set", () => {
    // Save the original process and process.env
    const originalProcess = global.process;
    const originalEnv = { ...process.env };

    // Test case 1: Normal case - process is object and Q_DEBUG is set
    process.env.Q_DEBUG = "1";
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(Q1.longStackSupport).toBe(true);

    // Test case 2: Edge case - process exists but is not a proper object
    // This will expose the mutation where the typeof check was removed
    global.process = { toString: () => "not [object process]" } as any;
    process.env.Q_DEBUG = "1";

    try {
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Original code: should be false because typeof process !== "object"
      // Mutated code: will be true because it only checks process.env.Q_DEBUG
      expect(Q2.longStackSupport).toBe(false);

      // Restore original process and environment
      global.process = originalProcess;
      process.env = originalEnv;
    } catch (e) {
      global.process = originalProcess;
      process.env = originalEnv;
      throw e;
    }
  });
});