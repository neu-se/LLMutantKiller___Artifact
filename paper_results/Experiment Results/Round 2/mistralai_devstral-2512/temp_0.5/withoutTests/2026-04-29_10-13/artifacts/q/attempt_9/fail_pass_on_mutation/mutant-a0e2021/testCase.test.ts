const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should not enable long stack support when process.env is undefined", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a mock process without env
    global.process = {
      toString: () => "[object process]"
    };

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