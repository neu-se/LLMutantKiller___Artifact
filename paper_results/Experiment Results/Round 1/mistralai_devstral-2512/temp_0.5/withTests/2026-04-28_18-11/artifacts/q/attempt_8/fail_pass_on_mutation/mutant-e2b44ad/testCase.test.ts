import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process.domain check in done()", () => {
  it("should correctly handle process.domain when process is an object", async () => {
    // Store original process
    const originalProcess = global.process;

    try {
      // Create a proper mock process object with domain
      const mockDomain = {
        bind: (callback: Function) => callback,
        enter: () => {},
        exit: () => {}
      };

      (global as any).process = {
        nextTick: (callback: Function) => callback(),
        domain: mockDomain
      };

      // Create a rejected promise
      const error = new Error("Test error");
      const promise = Q.reject(error);

      // Track error handling
      let errorHandled = false;
      promise.done(null, (err: Error) => {
        errorHandled = true;
      });

      // Wait for promise to settle
      await new Promise(resolve => setTimeout(resolve, 10));

      // Verify error was handled
      expect(errorHandled).toBe(true);
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});