const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not track unhandled rejections when process.emit is not available", () => {
    const originalProcess = global.process;

    // Mock process without emit function
    global.process = {
      ...process,
      emit: undefined,
      listeners: () => []
    };

    // Create and reject a promise without handling it
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait for the unhandled rejection tracking to occur
    return Q.delay(10).then(() => {
      // Check if any unhandled rejection was tracked
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections.length).toBe(0);

      // Restore original process
      global.process = originalProcess;
    });
  });
});