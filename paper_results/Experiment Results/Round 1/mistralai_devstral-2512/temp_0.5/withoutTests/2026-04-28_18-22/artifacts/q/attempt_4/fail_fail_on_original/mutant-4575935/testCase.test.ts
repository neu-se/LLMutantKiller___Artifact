describe("Q library global export", () => {
  it("should export Q to the global object when running in a browser-like environment", () => {
    // Save original global properties
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;

    // Create a mock global object
    const mockGlobal = {
      Q: undefined,
      document: {}
    };

    // Set up browser-like environment
    (global as any).window = mockGlobal;
    (global as any).self = undefined;

    // Clear module cache and load Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was exported to our mock global
    expect(mockGlobal.Q).toBeDefined();
    expect(typeof mockGlobal.Q).toBe("function");

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
  });
});