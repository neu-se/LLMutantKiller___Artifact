describe("Q module loading", () => {
  it("should load without error when process is undefined", () => {
    // Save original process
    const originalProcess = global.process;

    // Make process undefined
    global.process = undefined;

    // Clear module cache
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];

    // This should work in original but throw in mutated
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q");
    }).not.toThrow();

    // Restore original process
    global.process = originalProcess;
  });
});