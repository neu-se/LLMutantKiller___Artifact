// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization in browser environment", () => {
  it("should expose Q as a global when ses is not defined", () => {
    // Save the original global Q if it exists
    const originalGlobalQ = (global as any).Q;

    // Simulate a browser-like environment where ses is not defined
    const globalObject = {
      Q: undefined,
      window: {},
      self: {}
    };

    // Mock the global object to simulate browser environment
    (global as any).Q = undefined;
    (global as any).window = globalObject.window;
    (global as any).self = globalObject.self;

    // Load Q in this environment
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const Q = qModule;

    // Verify Q is exposed as a global
    expect((global as any).Q).toBeDefined();
    expect(typeof (global as any).Q).toBe("function");

    // Verify Q.noConflict works
    const originalQ = (global as any).Q.noConflict();
    expect((global as any).Q).toBeUndefined();
    expect(originalQ).toBeDefined();

    // Restore the original global Q
    (global as any).Q = originalGlobalQ;
  });
});