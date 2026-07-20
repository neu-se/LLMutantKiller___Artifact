const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", () => {
    const originalProcess = global.process;
    const originalEmit = process.emit;

    // Create a mock process without emit function
    global.process = {
      ...process,
      emit: undefined,
      listeners: () => []
    };

    let unhandledRejectionEmitted = false;

    // Create a rejected promise that should not be handled
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Restore process.emit to check if emission was attempted
    global.process.emit = function(event: string, ...args: any[]) {
      if (event === 'unhandledRejection') {
        unhandledRejectionEmitted = true;
      }
      return false;
    };

    // Wait for the unhandled rejection tracking to occur
    return Q.delay(10).then(() => {
      // Restore original process
      global.process = originalProcess;

      // The mutation would cause unhandledRejection to be emitted even when
      // process.emit is not a function, which should not happen in the original
      expect(unhandledRejectionEmitted).toBe(false);
    });
  });
});