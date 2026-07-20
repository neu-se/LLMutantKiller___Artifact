// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization in browser environment", () => {
  it("should properly set up Q in browser environment with ses defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalSes = global.ses;

    // Create mock objects
    const mockWindow = {};
    const mockSelf = {};
    const mockSes = {
      ok: () => true,
      makeQ: undefined
    };

    try {
      // Set up mock environment
      global.window = mockWindow as any;
      global.self = mockSelf as any;
      global.ses = mockSes as any;

      // Clear require cache and re-import
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify ses.makeQ was set
      expect(mockSes.makeQ).toBeDefined();
      expect(typeof mockSes.makeQ).toBe("function");

      // Verify Q is available on window and self
      expect(mockWindow.Q).toBeDefined();
      expect(mockSelf.Q).toBeDefined();
      expect(typeof mockWindow.Q).toBe("function");
      expect(typeof mockSelf.Q).toBe("function");

    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
      global.ses = originalSes;
    }
  });
});