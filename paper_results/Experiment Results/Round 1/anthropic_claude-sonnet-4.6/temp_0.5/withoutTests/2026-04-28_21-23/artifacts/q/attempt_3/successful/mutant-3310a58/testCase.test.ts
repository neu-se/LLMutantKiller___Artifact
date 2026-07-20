describe("Q", () => {
  it("should load safely when process is undefined", () => {
    const orig = global.process;
    // @ts-ignore  
    delete global.process;
    jest.resetModules();
    expect(() => require("../../../../../../../../../../../subject_repositories/q/q.js")).not.toThrow();
    global.process = orig;
  });
});