import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track rejections when process is an object with emit function", () => {
    // Create a mock process object with emit function and nextTick
    const originalProcess = global.process;
    global.process = {
      emit: jest.fn(),
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

        // Verify unhandled rejection was tracked
        expect(Q.getUnhandledReasons().length).toBe(1);
        expect(Q.getUnhandledReasons()[0]).toContain(error.stack);
        resolve();
      }, 100);
    });
  });
});