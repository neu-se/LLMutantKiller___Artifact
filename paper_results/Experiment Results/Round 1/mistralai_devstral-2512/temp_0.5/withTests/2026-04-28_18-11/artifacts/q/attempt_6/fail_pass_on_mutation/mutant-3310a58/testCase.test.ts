const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should not enable long stack support when process is not an object, even if Q_DEBUG is set", () => {
    // Save the original process and process.env
    const originalProcess = global.process;
    const originalEnv = { ...process.env };

    try {
      // Set Q_DEBUG but make process not an object
      process.env.Q_DEBUG = "1";

      // Create a fake process that's not an object (make it a string)
      global.process = "not an object" as any;

      // Clear the require cache and re-import Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const QWithFakeProcess = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, this should be false because process is not an object
      // In the mutated code, this will try to access process.env and likely throw an error
      const longStackSupportEnabled = QWithFakeProcess.longStackSupport;

      // Restore original process and environment
      global.process = originalProcess;
      process.env = originalEnv;

      // The test should pass if long stack support was NOT enabled when process is not an object
      expect(longStackSupportEnabled).toBe(false);
    } catch (e) {
      // If we get here, the mutated code tried to access process.env when process wasn't an object
      // Restore original process and environment
      global.process = originalProcess;
      process.env = originalEnv;

      // The test should fail if an error was thrown (which would happen with mutated code)
      throw e;
    }
  });
});