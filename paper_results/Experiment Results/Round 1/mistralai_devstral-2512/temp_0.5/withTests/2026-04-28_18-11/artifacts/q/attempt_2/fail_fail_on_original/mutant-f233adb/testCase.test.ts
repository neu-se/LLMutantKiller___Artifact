// Test to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization", () => {
  it("should properly initialize Q in a browser-like environment", () => {
    // Save the original global Q if it exists
    const originalQ = (typeof window !== 'undefined' ? window.Q : undefined);

    // Simulate a browser-like environment
    const mockWindow = {};
    const mockSelf = {};

    // Temporarily replace global objects
    global.window = mockWindow as any;
    global.self = mockSelf as any;

    // Clear the require cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // Re-import Q to trigger the initialization code
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore original global objects
    delete global.window;
    delete global.self;
    if (originalQ !== undefined && typeof window !== 'undefined') {
      window.Q = originalQ;
    }

    // Verify that Q was properly exposed to the mock window and self objects
    expect(mockWindow.Q).toBeDefined();
    expect(mockSelf.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
    expect(typeof mockSelf.Q).toBe("function");

    // Verify that the exposed Q has the expected API
    expect(typeof mockWindow.Q.resolve).toBe("function");
    expect(typeof mockWindow.Q.reject).toBe("function");
    expect(typeof mockWindow.Q.defer).toBe("function");
  });
});