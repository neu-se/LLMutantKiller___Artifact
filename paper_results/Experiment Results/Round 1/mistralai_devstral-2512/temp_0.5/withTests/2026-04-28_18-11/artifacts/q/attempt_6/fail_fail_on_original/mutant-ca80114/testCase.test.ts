import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick error handling behavior", () => {
  it("should handle errors asynchronously in non-Node environments", async () => {
    // Save original process
    const originalProcess = global.process;

    // Simulate non-Node environment
    delete (global as any).process;

    let syncError: Error | null = null;
    let asyncError: Error | null = null;

    // Set up async error handler
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = (error: Error) => {
      asyncError = error;
    };

    try {
      Q.nextTick(() => {
        throw new Error("Test error");
      });
    } catch (e) {
      syncError = e as Error;
    }

    // Wait for async error handling
    await new Promise(resolve => setTimeout(resolve, 10));

    // Restore process
    global.process = originalProcess;
    (Q as any).onerror = originalOnerror;

    // In original code (non-Node), error should be async (syncError = null, asyncError != null)
    // In mutated code, error will be sync (syncError != null, asyncError = null)
    expect(syncError).toBeNull();
    expect(asyncError).not.toBeNull();
    expect(asyncError?.message).toBe("Test error");
  });
});