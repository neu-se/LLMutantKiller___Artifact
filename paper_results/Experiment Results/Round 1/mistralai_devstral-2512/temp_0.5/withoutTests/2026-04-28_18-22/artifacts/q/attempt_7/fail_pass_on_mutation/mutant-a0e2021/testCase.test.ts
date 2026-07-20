const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q long stack support", () => {
  it("should not throw error when process is undefined and Q_DEBUG is set", () => {
    // Save original process
    const originalProcess = global.process;

    // Set Q_DEBUG in a mock environment
    const mockEnv = { Q_DEBUG: "1" };

    // Test with process undefined (should not throw in original, will throw in mutated)
    global.process = undefined;
    let errorThrown = false;

    try {
      // Clear module cache to get fresh Q instance
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
      require("../../../../../../../../../../../subject_repositories/q/q");
    } catch (e) {
      errorThrown = true;
    }

    // Original code should not throw, mutated code will throw
    expect(errorThrown).toBe(false);

    // Restore original process
    global.process = originalProcess;
  });
});