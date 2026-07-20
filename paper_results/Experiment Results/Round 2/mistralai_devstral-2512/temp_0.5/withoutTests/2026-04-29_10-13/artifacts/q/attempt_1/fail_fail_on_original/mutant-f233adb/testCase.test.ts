// Test to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library initialization", () => {
  it("should properly initialize Q in a browser-like environment", () => {
    // Simulate a browser-like environment
    const globalObj = { Q: undefined };
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Set up the test environment
    global.window = globalObj;
    global.self = globalObj;

    // Load Q in this environment
    const qModule = require("./q.js");

    // Verify Q was properly initialized
    expect(globalObj.Q).toBeDefined();
    expect(typeof globalObj.Q).toBe("function");

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
  });
});