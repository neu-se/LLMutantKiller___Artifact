import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when process.emit is not a function", () => {
    const originalProcess = global.process;
    const originalEmit = process.emit;

    // Create a mock process object without emit function
    global.process = { ...process, emit: undefined as any };

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Force garbage collection to trigger unhandled rejection tracking
    global.gc?.();

    // Restore original process
    global.process = originalProcess;
    process.emit = originalEmit;

    // Verify no unhandled rejections were tracked
    expect(Q.getUnhandledReasons()).toHaveLength(0);
  });
});