// Test case to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

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

    // Load Q in this environment
    // The original code should expose Q on window
    // The mutated code (with `false || typeof self !== "undefined"`) should fail to expose Q on window
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is exposed on window in original code
    expect(globalAny.window.Q).toBeDefined();
    expect(typeof globalAny.window.Q).toBe("function");

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
    globalAny.Q = originalQ;
  });
});