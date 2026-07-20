// Test to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization", () => {
  it("should expose Q as a global when running in a browser-like environment", () => {
    // Simulate a browser-like environment by setting up a mock global object
    const mockGlobal = {
      Q: undefined,
      window: {},
      self: {}
    };

    // Temporarily replace the global context to simulate browser environment
    const originalGlobal = global;
    global.window = mockGlobal.window;
    global.self = mockGlobal.self;

    // Force re-evaluation of Q in the simulated environment
    // This will trigger the mutated code path
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore original global context
    global = originalGlobal;

    // Verify Q was properly exposed to the global object
    expect(mockGlobal.window.Q).toBeDefined();
    expect(mockGlobal.self.Q).toBeDefined();
    expect(typeof mockGlobal.window.Q).toBe("function");
    expect(typeof mockGlobal.self.Q).toBe("function");
  });
});