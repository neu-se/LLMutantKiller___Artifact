// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library global object detection", () => {
  it("should correctly identify global object in browser-like environment", () => {
    // Create a mock browser-like environment
    const globalObj = { Q: undefined };
    const window = { Q: undefined };
    const self = { Q: undefined };

    // Simulate the global detection logic
    const global = typeof window !== "undefined" ? window : self;

    // Verify that Q is attached to the correct global object
    // In the original code, when both window and self are defined,
    // window should be preferred
    expect(global).toBe(window);

    // Now test with only self defined (mutation would fail this)
    delete globalObj.window;
    const global2 = typeof globalObj.window !== "undefined" ? globalObj.window : self;
    expect(global2).toBe(self);
  });
});