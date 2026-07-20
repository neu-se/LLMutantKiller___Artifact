import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick error handling", () => {
  it("should handle errors asynchronously in browser environment", async () => {
    // Save original process
    const originalProcess = global.process;

    // Simulate browser environment
    delete (global as any).process;
    (global as any).window = {};

    let errorHandled = false;

    // Set up error handler
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = (error: any) => {
      errorHandled = true;
      expect(error.message).toBe("Test error");
    };

    // This should not throw synchronously in browser environment
    Q.nextTick(() => {
      throw new Error("Test error");
    });

    // Wait for async error handling
    await new Promise(resolve => setTimeout(resolve, 50));

    // Restore environment
    global.process = originalProcess;
    delete (global as any).window;
    (Q as any).onerror = originalOnerror;

    // In original code (browser), error should be handled asynchronously
    // In mutated code, error will be thrown synchronously and won't reach onerror
    expect(errorHandled).toBe(true);
  });
});