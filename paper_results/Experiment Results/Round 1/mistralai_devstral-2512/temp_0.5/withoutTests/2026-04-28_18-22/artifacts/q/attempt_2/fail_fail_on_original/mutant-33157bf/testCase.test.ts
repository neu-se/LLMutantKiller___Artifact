import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise rejection tracking", () => {
  it("should not track rejections when process is an object without emit function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    const originalProcess = global.process;

    // Create a mock process object without emit function
    const mockProcess = { ...process };
    delete mockProcess.emit;

    // Replace global process
    global.process = mockProcess;

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Restore original process after a delay
    setTimeout(() => {
      global.process = originalProcess;
      global.process.emit = originalEmit;
      done();
    }, 100);
  });
});