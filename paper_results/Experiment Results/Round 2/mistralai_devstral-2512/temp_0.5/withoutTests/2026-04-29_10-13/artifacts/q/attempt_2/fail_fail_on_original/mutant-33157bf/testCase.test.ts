import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should track rejections when process.emit is a function", () => {
    const originalProcess = global.process;
    const originalEmit = process.emit;

    // Create a mock process object with emit function
    global.process = {
      ...process,
      emit: jest.fn()
    };

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Force the unhandled rejection tracking to run
    setTimeout(() => {
      // Verify that process.emit was called for unhandled rejection
      expect(process.emit).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), rejectedPromise);

      // Restore original process
      global.process = originalProcess;
      process.emit = originalEmit;
    }, 10);

    // Return the promise to keep the test running
    return new Promise(resolve => {
      setTimeout(resolve, 50);
    });
  });
});