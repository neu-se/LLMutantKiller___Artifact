import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global object detection", () => {
  it("should prefer window over self when both are defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    try {
      // Create mock globals
      const mockWindow = {};
      const mockSelf = {};

      // Set up environment where both window and self exist
      global.window = mockWindow as any;
      global.self = mockSelf as any;

      // Clear module cache to force re-initialization
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be attached to window (not self)
      expect(mockWindow.Q).toBeDefined();
      expect(mockWindow.Q).toBe(freshQ);
      expect(mockSelf.Q).toBeUndefined();

    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});