// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization", () => {
  it("should properly initialize Q in browser environment", () => {
    // Save original window and self
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Create mock browser environment
    const mockWindow = {};
    const mockSelf = {};

    try {
      // Set up mock browser environment
      global.window = mockWindow as any;
      global.self = mockSelf as any;

      // Clear require cache and re-import
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q was properly exposed to window and self
      expect(mockWindow.Q).toBeDefined();
      expect(mockSelf.Q).toBeDefined();
      expect(typeof mockWindow.Q).toBe("function");
      expect(typeof mockSelf.Q).toBe("function");

      // Verify Q has expected API
      expect(typeof mockWindow.Q.resolve).toBe("function");
      expect(typeof mockWindow.Q.reject).toBe("function");

    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});