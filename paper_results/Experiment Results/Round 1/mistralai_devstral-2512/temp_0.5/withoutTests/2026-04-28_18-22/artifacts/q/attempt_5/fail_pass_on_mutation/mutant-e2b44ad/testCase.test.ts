const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should handle unhandled errors correctly when process.domain exists", (done) => {
    // Create a complete mock process object with domain
    const originalProcess = global.process;
    global.process = {
      domain: {
        bind: (fn: Function) => fn,
        enter: () => {},
        exit: () => {}
      },
      nextTick: (fn: Function) => fn()
    } as any;

    // Create a rejected promise and call done() on it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Mock Q.onerror to prevent actual error throwing
    const originalOnerror = Q.onerror;
    Q.onerror = (error: any) => {
      // Verify the error was handled
      expect(error.message).toBe("Test error");
      Q.onerror = originalOnerror;
      global.process = originalProcess;
      done();
    };

    rejectedPromise.done();
  });
});