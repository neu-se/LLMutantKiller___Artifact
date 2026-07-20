const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should not enable long stack support when process is null", () => {
    // Save original process
    const originalProcess = global.process;

    // Set process to null
    global.process = null;

    // Set Q_DEBUG in environment (though process is null)
    // This simulates a case where process.env might exist but process itself is invalid
    try {
      // Reset Q module to pick up new process
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify long stack support is NOT enabled (original behavior)
      expect(Q.longStackSupport).toBe(false);
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});