// Test case to detect the mutation in q.js
describe("Q library initialization", () => {
  it("should expose Q as a global when running in a browser-like environment with window defined", () => {
    // Simulate a browser-like environment with window defined
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    // Setup a mock window object
    globalAny.window = {};
    delete globalAny.self;
    delete globalAny.Q;

    // Load Q in this environment by requiring it
    // The original code should expose Q on window when window is defined
    // The mutated code (with `false || typeof self !== "undefined"`) should not expose Q on window
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qModule = require(qPath);

    // Verify Q is exposed on window in original code
    // Check if Q exists on window and is the same as the module export
    if (typeof globalAny.window.Q === 'undefined') {
      throw new Error("Q was not exposed on window as expected");
    }

    expect(globalAny.window.Q).toBe(qModule);

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
    globalAny.Q = originalQ;
  });
});