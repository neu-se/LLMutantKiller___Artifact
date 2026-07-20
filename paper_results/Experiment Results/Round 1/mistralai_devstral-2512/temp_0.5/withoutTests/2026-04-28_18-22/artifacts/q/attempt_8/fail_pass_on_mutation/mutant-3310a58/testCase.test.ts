const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should handle missing process object gracefully", () => {
    // Save the original process
    const originalProcess = global.process;

    // Create a mock process object that exists but doesn't have env
    global.process = {};

    // This should work in original code (process exists but no env)
    // but might behave differently in mutated code
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QNoEnv = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, this should be false because process.env is undefined
    // In mutated code, this might be true or throw depending on evaluation order
    expect(QNoEnv.longStackSupport).toBe(false);

    // Restore process
    global.process = originalProcess;
  });
});