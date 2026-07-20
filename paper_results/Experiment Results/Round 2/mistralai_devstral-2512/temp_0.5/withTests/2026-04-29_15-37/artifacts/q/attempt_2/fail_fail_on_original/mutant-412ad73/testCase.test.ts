// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should expose Q as a global when loaded in browser-like environment", () => {
    // Simulate a browser-like environment where window is defined
    const globalAny = global as any;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Create a mock window object
    globalAny.window = {};
    globalAny.self = {};

    // Load Q in this environment
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is available as a global
    expect(globalAny.window.Q).toBeDefined();
    expect(typeof globalAny.window.Q).toBe('function');

    // Clean up
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
  });
});