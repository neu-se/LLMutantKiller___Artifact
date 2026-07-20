describe("Q library global export", () => {
  it("should expose Q as a global when running in browser-like environment", () => {
    // Clear any existing Q global
    const globalAny: any = global;
    delete globalAny.Q;

    // Set up browser-like environment
    globalAny.window = {};
    globalAny.self = {};

    // Load Q library
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is exposed as global
    expect(globalAny.Q).toBeDefined();
    expect(typeof globalAny.Q).toBe("function");

    // Verify Q has expected methods
    expect(typeof globalAny.Q.resolve).toBe("function");
    expect(typeof globalAny.Q.reject).toBe("function");

    // Cleanup
    delete globalAny.Q;
    delete globalAny.window;
    delete globalAny.self;
  });
});