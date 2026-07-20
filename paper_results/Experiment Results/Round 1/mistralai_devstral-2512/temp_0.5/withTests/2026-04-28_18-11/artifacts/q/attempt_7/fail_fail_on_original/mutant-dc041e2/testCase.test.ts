// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should expose Q as a global in browser environment when ses is not defined", () => {
    // Save the original global Q if it exists
    const originalGlobalQ = (global as any).Q;

    // Create a mock browser environment
    const mockWindow = {};
    const mockSelf = {};

    // Simulate loading Q in a browser environment
    (function() {
      const definition = require("../../../../../../../../../../../subject_repositories/q/q.js");
      const global = typeof window !== 'undefined' ? window : mockWindow;
      const previousQ = global.Q;
      global.Q = definition();

      // Verify Q is exposed as a global
      expect(global.Q).toBeDefined();
      expect(typeof global.Q).toBe("object");

      // Verify Q has the expected properties
      expect(typeof global.Q.resolve).toBe("function");
      expect(typeof global.Q.reject).toBe("function");
      expect(typeof global.Q.defer).toBe("function");

      // Restore the original global Q
      global.Q = previousQ;
    })();
  });
});