const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q long stack support", () => {
  it("should handle missing process object gracefully", () => {
    // Save original process
    const originalProcess = global.process;

    // Test with process undefined
    global.process = undefined;

    // Clear module cache to get fresh Q instance
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];

    // This should work in original code but throw in mutated code
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q");
    }).not.toThrow();

    // Restore original process
    global.process = originalProcess;
  });
});