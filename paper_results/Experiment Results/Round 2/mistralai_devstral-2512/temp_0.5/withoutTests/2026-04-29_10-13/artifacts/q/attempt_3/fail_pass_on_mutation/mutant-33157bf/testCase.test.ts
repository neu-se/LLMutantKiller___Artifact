const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track rejections when process.emit is a function", () => {
    const originalProcess = global.process;
    const originalEmit = process.emit;
    const emitSpy = jest.fn();

    // Create a mock process object with emit function
    global.process = {
      ...process,
      emit: emitSpy
    };

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Force the unhandled rejection tracking to run
    return new Promise(resolve => {
      setTimeout(() => {
        // Verify that process.emit was called for unhandled rejection
        expect(emitSpy).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), rejectedPromise);

        // Restore original process
        global.process = originalProcess;
        process.emit = originalEmit;
        resolve(undefined);
      }, 10);
    });
  });
});