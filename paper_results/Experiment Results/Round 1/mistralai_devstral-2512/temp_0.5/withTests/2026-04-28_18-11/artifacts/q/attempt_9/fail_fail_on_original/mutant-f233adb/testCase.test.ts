// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
  it("should properly handle browser environment when ses is not defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalSes = (global as any).ses;

    // Create mock browser environment
    const mockWindow = {};
    const mockSelf = {};

    try {
      // Set up mock browser environment without ses
      global.window = mockWindow as any;
      global.self = mockSelf as any;
      delete (global as any).ses;

      // Clear require cache and re-import
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q was properly exposed to window and self
      expect(mockWindow.Q).toBeDefined();
      expect(mockSelf.Q).toBeDefined();

      // Verify Q has the expected API
      expect(typeof mockWindow.Q.resolve).toBe("function");
      expect(typeof mockWindow.Q.reject).toBe("function");

      // The key test: verify that Q.noConflict exists and works
      expect(typeof mockWindow.Q.noConflict).toBe("function");

      // Test noConflict functionality
      const originalQ = mockWindow.Q;
      const returnedQ = mockWindow.Q.noConflict();
      expect(mockWindow.Q).toBeUndefined();
      expect(returnedQ).toBe(originalQ);

    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
      (global as any).ses = originalSes;
    }
  });
});