const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should not throw error when process is undefined", () => {
    // Save the original process
    const originalProcess = global.process;

    // Delete process to simulate browser environment
    delete global.process;

    // This should not throw in original code but might in mutated version
    expect(() => {
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();

    // Restore process
    global.process = originalProcess;
  });
});