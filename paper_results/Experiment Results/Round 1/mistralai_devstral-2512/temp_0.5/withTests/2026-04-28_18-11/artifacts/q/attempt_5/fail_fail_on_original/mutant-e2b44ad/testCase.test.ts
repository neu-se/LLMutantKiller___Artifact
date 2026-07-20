import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process.domain check in done()", () => {
  it("should correctly check typeof process when process.domain exists", async () => {
    // Create a mock process object with domain property
    const mockDomain = {
      bind: (callback: Function) => callback
    };

    const mockProcess = {
      nextTick: (callback: Function) => callback(),
      domain: mockDomain
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    (global as any).process = mockProcess;

    try {
      // Create a rejected promise and call done() on it
      const error = new Error("Test error");
      const promise = Q.reject(error);

      // Track if the error was handled
      let errorHandled = false;
      promise.done(null, (err: Error) => {
        errorHandled = true;
      });

      // Wait for the promise to settle
      await new Promise(resolve => setTimeout(resolve, 10));

      // Verify the error was handled
      expect(errorHandled).toBe(true);
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});