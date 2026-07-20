import { Q } from "./q.js";

describe("Q library global export", () => {
  it("should expose Q as a global when running in browser-like environment", () => {
    // Simulate a browser-like environment
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Setup mock browser environment
    globalAny.window = {};
    globalAny.self = {};

    // Clear any existing Q global and require fresh
    delete globalAny.Q;
    const qModule = require("./q.js");

    // Verify Q is exposed as global
    expect(globalAny.Q).toBeDefined();
    expect(typeof globalAny.Q).toBe("function");

    // Verify it's the same Q instance
    expect(globalAny.Q).toBe(qModule);

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
    delete globalAny.Q;
  });
});