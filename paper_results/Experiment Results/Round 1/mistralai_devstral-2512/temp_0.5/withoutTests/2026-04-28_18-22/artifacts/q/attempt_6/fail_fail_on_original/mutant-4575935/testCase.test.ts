describe("Q library global export", () => {
  it("should export Q to window when window is defined", () => {
    // Save original window and self
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Create a mock window object
    const mockWindow = {
      Q: undefined,
      document: {}
    };

    // Set up browser-like environment
    global.window = mockWindow as any;
    global.self = undefined as any;

    // Clear module cache and load Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was exported to window
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");

    // Verify Q is also returned from require
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
  });
});