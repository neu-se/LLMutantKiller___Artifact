import { Q } from "./q";

describe("Q library initialization", () => {
  it("should expose Q as a global when window is defined", () => {
    // Simulate a browser-like environment with window but no self
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    // Setup test environment
    globalAny.window = {};
    delete globalAny.self;
    delete globalAny.Q;

    // Load Q in this environment
    const qModule = require("./q");
    const Q = qModule;

    // Verify Q is exposed on window
    expect(globalAny.window.Q).toBeDefined();
    expect(globalAny.window.Q).toBe(Q);

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
    globalAny.Q = originalQ;
  });
});