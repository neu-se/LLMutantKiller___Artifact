describe("Q library global export", () => {
  it("should export Q to the global object when running in a browser-like environment", () => {
    // Simulate a browser-like environment
    const globalObject = { Q: undefined };
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Set up the environment
    global.window = globalObject as any;
    global.self = undefined as any;

    // Reset the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify that Q was exported to the global object
    expect(globalObject.Q).toBeDefined();
    expect(typeof globalObject.Q).toBe("function");

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
  });
});