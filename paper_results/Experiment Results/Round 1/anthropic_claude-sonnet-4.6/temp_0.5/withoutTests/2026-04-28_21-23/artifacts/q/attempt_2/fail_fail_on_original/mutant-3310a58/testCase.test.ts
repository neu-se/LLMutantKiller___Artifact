describe("Q longStackSupport initialization", () => {
  it("should handle null process safely", () => {
    const originalProcess = global.process;
    // @ts-ignore
    global.process = null;
    jest.resetModules();
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();
    global.process = originalProcess;
  });
});