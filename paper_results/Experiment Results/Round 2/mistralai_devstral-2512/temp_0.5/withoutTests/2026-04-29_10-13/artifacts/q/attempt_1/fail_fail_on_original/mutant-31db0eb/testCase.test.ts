import { Q } from "./q";

describe("Q library setImmediate detection", () => {
  it("should use setImmediate when available in non-window environments", (done) => {
    // Save original setImmediate and window
    const originalSetImmediate = global.setImmediate;
    const originalWindow = global.window;

    // Setup test environment
    global.setImmediate = jest.fn((fn) => {
      // Simulate setImmediate behavior
      setTimeout(fn, 0);
      return { unref: () => {} };
    });
    global.window = undefined;

    // Create a promise and track execution
    let executionPath = "pending";
    Q.resolve("test")
      .then(() => {
        executionPath = "fulfilled";
        // Check if setImmediate was called
        expect(global.setImmediate).toHaveBeenCalled();
        // Restore environment
        global.setImmediate = originalSetImmediate;
        global.window = originalWindow;
        done();
      });

    // Force a small delay to allow async execution
    setTimeout(() => {
      if (executionPath === "pending") {
        executionPath = "timeout";
        // Restore environment
        global.setImmediate = originalSetImmediate;
        global.window = originalWindow;
        done.fail("Promise did not resolve");
      }
    }, 100);
  });
});