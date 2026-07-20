const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should not enable long stack support when process is not a proper object", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a mock process that's not a proper object
    global.process = {
      env: { Q_DEBUG: "1" },
      toString: () => "[object fake]"
    };

    // Reset Q module to pick up new process
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify long stack support is NOT enabled (original behavior)
    expect(Q.longStackSupport).toBe(false);

    // Restore original process
    global.process = originalProcess;
  });
});