const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track rejections when process is not an object", () => {
    const originalProcess = global.process;
    const originalEmit = process.emit;

    // Create a mock process that is not an object (null)
    global.process = null as any;

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