import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not track rejections when process is an object without emit function", () => {
    // Create a mock process object without emit function but with nextTick
    const originalProcess = global.process;
    global.process = {
      nextTick: (callback) => setTimeout(callback, 0),
      toString: () => "[object process]"
    };

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create and reject a promise
    const error = new Error("test error");
    Q.reject(error);

    // Wait for async operations to complete
    return new Promise((resolve) => {
      setTimeout(() => {
        // Restore original process
        global.process = originalProcess;

        // Verify no unhandled rejection was tracked
        expect(Q.getUnhandledReasons().length).toBe(0);
        resolve();
      }, 100);
    });
  });
});