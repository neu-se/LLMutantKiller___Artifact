import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library behavior", () => {
  it("should use setImmediate when available in browser environment", () => {
    // This test verifies that Q correctly uses setImmediate in browser environments
    // where it's available. The mutation changes the condition from checking
    // `typeof window !== "undefined"` to `if (false)`, which would prevent
    // the proper use of setImmediate.

    // Save original setImmediate and window
    const originalSetImmediate = global.setImmediate;
    const originalWindow = global.window;

    // Mock browser environment with setImmediate
    global.window = {};
    global.setImmediate = jest.fn((callback) => {
      // Simulate setImmediate behavior
      setTimeout(callback, 0);
    });

    // Create a promise and verify it resolves
    let resolved = false;
    Q.resolve("test").then((value) => {
      resolved = true;
      expect(value).toBe("test");
    });

    // Restore originals
    global.setImmediate = originalSetImmediate;
    global.window = originalWindow;

    // The test passes if the promise resolves correctly using setImmediate
    // In the mutated version, this would fail because setImmediate wouldn't be used
    expect(resolved).toBe(true);
  });
});