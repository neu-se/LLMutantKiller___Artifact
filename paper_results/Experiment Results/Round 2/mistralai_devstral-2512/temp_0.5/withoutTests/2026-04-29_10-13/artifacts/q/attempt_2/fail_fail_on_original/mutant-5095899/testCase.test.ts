import { Q } from "./q.js";

describe("Q library initialization", () => {
  it("should initialize Q on the correct global object when both window and self are defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    try {
      // Create mock globals
      const mockWindow = { Q: undefined };
      const mockSelf = { Q: undefined };

      // Set up environment where both window and self exist
      global.window = mockWindow;
      global.self = mockSelf;

      // Clear any existing Q to force re-initialization
      delete require.cache[require.resolve("./q.js")];
      const { Q: FreshQ } = require("./q.js");

      // In original code, window should be preferred over self
      expect(mockWindow.Q).toBeDefined();
      expect(mockWindow.Q).toBe(FreshQ);
      expect(mockSelf.Q).toBeUndefined();

    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});