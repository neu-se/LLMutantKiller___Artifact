import { Q } from "./q.js";

describe("Q promise rejection tracking", () => {
  it("should not emit unhandledRejection when process is an object without emit function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process to be an object without emit function
    const mockProcess = { ...process };
    delete mockProcess.emit;
    global.process = mockProcess;

    // Create a promise that will be rejected but not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Restore original process.emit after a short delay
    setTimeout(() => {
      global.process.emit = originalEmit;
      done();
    }, 100);
  });
});