// Test to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library initialization", () => {
  it("should properly initialize Q in a browser-like environment with window object", () => {
    // Simulate a browser-like environment
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    // Setup mock window object
    globalAny.window = { Q: undefined };
    globalAny.self = { Q: undefined };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("./q.js")];
    const Q = require("./q.js");

    // Verify Q is properly initialized on window
    expect(globalAny.window.Q).toBeDefined();
    expect(globalAny.window.Q).toBe(Q);

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
    globalAny.Q = originalQ;
  });
});