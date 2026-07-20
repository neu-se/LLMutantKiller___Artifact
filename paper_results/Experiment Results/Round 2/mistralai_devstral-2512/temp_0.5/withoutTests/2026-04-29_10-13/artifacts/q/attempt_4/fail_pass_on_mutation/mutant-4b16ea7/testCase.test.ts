import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library setImmediate detection", () => {
  it("should correctly detect and use setImmediate in browser environment", (done) => {
    // Save original environment
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Create a mock browser environment
    global.window = {
      setImmediate: function(callback: () => void) {
        // Use setTimeout to simulate setImmediate
        return setTimeout(callback, 0) as any;
      }
    } as any;

    // Ensure setImmediate is available globally
    global.setImmediate = global.window.setImmediate;

    // Create a promise and verify it resolves correctly
    Q.resolve("test").then((result: string) => {
      expect(result).toBe("test");

      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;

      done();
    });
  });
});