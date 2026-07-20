const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should handle missing process.env gracefully", () => {
    // Save the original process and process.env
    const originalProcess = global.process;
    const originalEnv = { ...process.env };

    // Create a mock process object without env property
    global.process = { toString: () => "[object process]" } as any;

    try {
      // Clear the require cache and re-import Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const QMock = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, this should be false because process.env is undefined
      // In the mutated code, this will throw TypeError trying to access undefined
      const longStackSupportEnabled = QMock.longStackSupport;

      // Restore original process and environment
      global.process = originalProcess;
      process.env = originalEnv;

      // The test should pass if long stack support was NOT enabled when process.env is missing
      expect(longStackSupportEnabled).toBe(false);
    } catch (e) {
      // If we get here, the mutated code threw an error
      global.process = originalProcess;
      process.env = originalEnv;
      throw new Error("Mutated code failed to handle missing process.env");
    }
  });
});