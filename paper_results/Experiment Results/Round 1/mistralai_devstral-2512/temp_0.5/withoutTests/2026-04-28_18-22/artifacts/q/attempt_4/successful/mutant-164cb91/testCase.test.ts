const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when process.emit is a function", (done) => {
    // Create a complete mock process object with all required properties
    const mockProcess = {
      emit: jest.fn(),
      domain: undefined,
      nextTick: (callback: Function) => setTimeout(callback, 0),
      toString: () => "[object process]"
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    global.process = mockProcess as any;

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait for the next tick to allow the rejection tracking to occur
    setTimeout(() => {
      // Verify that process.emit was called with "unhandledRejection"
      expect(mockProcess.emit).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), rejectedPromise);

      // Restore original process
      global.process = originalProcess;

      done();
    }, 50);
  });
});