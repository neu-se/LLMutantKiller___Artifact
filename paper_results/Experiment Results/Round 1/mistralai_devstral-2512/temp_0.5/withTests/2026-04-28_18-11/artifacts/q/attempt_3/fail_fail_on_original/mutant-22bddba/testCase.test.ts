// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global exposure in browser environment", () => {
  it("should expose Q as a global when window is defined but self is not", () => {
    // Save the original global objects
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalGlobalQ = global.Q;

    // Clean up any existing Q global
    delete (global as any).Q;

    // Set up a browser-like environment with window but no self
    (global as any).window = {};
    delete (global as any).self;

    // Force reload of Q module to test environment detection
    // This simulates what would happen when the script loads in a browser
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, Q should be exposed as a global when window is defined
    // In the mutated code, it would fail to expose Q in this case
    expect((global as any).Q).toBeDefined();
    expect((global as any).Q).toBe(qModule);

    // Clean up
    if (originalWindow !== undefined) {
      (global as any).window = originalWindow;
    } else {
      delete (global as any).window;
    }

    if (originalSelf !== undefined) {
      (global as any).self = originalSelf;
    } else {
      delete (global as any).self;
    }

    if (originalGlobalQ !== undefined) {
      (global as any).Q = originalGlobalQ;
    } else {
      delete (global as any).Q;
    }
  });
});