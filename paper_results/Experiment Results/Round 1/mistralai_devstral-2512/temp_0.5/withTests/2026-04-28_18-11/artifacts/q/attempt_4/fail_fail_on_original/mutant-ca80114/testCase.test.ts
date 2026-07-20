import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick environment detection", () => {
  it("should handle errors asynchronously in browser environment", () => {
    // Save original process and window
    const originalProcess = global.process;
    const originalWindow = global.window;

    // Simulate browser environment (no process, has window)
    delete (global as any).process;
    global.window = {} as any;

    let syncError = false;
    let asyncError = false;

    // Set up error handler
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = (error: Error) => {
      asyncError = true;
      expect(error.message).toBe("Test error");
    };

    try {
      Q.nextTick(() => {
        throw new Error("Test error");
      });
    } catch (e) {
      syncError = true;
    }

    // Restore environment
    global.process = originalProcess;
    global.window = originalWindow;
    (Q as any).onerror = originalOnerror;

    // In original code (browser), error should be async (syncError = false, asyncError = true)
    // In mutated code, error will be sync (syncError = true, asyncError = false)
    expect(syncError).toBe(false);
    expect(asyncError).toBe(true);
  });
});