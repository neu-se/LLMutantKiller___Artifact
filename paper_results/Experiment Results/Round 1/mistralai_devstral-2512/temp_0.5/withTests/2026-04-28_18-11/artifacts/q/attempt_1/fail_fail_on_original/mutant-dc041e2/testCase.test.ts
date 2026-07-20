// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization in browser environment", () => {
  it("should expose Q as a global when ses is not defined", () => {
    // Save the original global Q if it exists
    const originalGlobalQ = global.Q;

    // Simulate a browser-like environment where ses is not defined
    const globalObject = {
      Q: undefined,
      window: {},
      self: {}
    };

    // Mock the global object to simulate browser environment
    global.Q = undefined;
    global.window = globalObject.window;
    global.self = globalObject.self;

    // Load Q in this environment
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const Q = qModule;

    // Verify Q is exposed as a global
    expect(global.Q).toBeDefined();
    expect(typeof global.Q).toBe("function");

    // Verify Q.noConflict works
    const originalQ = global.Q.noConflict();
    expect(global.Q).toBeUndefined();
    expect(originalQ).toBeDefined();

    // Restore the original global Q
    global.Q = originalGlobalQ;
  });
});