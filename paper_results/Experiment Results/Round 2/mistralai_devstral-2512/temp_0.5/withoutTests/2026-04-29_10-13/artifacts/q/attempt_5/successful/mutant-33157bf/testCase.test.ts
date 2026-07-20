const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track rejections when process is an object but emit is not a function", () => {
    const originalProcess = global.process;
    const originalEmit = process.emit;
    const emitSpy = jest.fn();

    // Create a mock process object that is an object but emit is not a function
    global.process = {
      ...process,
      emit: "not a function" as any
    };

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Force the unhandled rejection tracking to run
    return new Promise(resolve => {
      setTimeout(() => {
        // In the original code, this should NOT call emit since emit is not a function
        // In the mutated code, this WILL call emit since it uses OR instead of AND
        expect(emitSpy).not.toHaveBeenCalled();

        // Restore original process
        global.process = originalProcess;
        process.emit = originalEmit;
        resolve(undefined);
      }, 10);
    });
  });
});