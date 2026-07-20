const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global object detection", () => {
  it("should correctly detect when both window and self are defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    try {
      // Create mock globals
      const mockWindow = {};
      const mockSelf = {};

      // Set up environment where both window and self exist
      global.window = mockWindow;
      global.self = mockSelf;

      // Clear module cache to force re-initialization
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be attached to window (not self)
      // The mutation would cause it to be attached to self instead
      expect(mockWindow).toHaveProperty("Q");
      expect(mockSelf).not.toHaveProperty("Q");

    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});