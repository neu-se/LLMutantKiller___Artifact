import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process.domain check in done()", () => {
  it("should handle errors correctly when process.domain is not available", async () => {
    // Create a mock process object without a domain property
    const mockProcess = {
      nextTick: (callback: Function) => callback(),
      // Explicitly not including domain property to test the mutation
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    (global as any).process = mockProcess;

    try {
      // Create a rejected promise and call done() on it
      // This should trigger the error handling path in done()
      const error = new Error("Test error");
      const promise = Q.reject(error);

      // Use a flag to track if the error was properly handled
      let errorHandled = false;
      promise.done(null, (err: Error) => {
        errorHandled = true;
      });

      // Wait a tick to allow the promise to settle
      await new Promise(resolve => setTimeout(resolve, 10));

      // The error should have been handled
      expect(errorHandled).toBe(true);
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});