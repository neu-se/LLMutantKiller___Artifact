const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done() with process.domain", () => {
  it("should correctly bind error handler when process.domain exists", (done) => {
    // Create a mock process object with domain
    const originalProcess = global.process;
    global.process = {
      nextTick: (callback: Function) => setTimeout(callback, 0),
      domain: {
        bind: (fn: Function) => {
          // Mark that bind was called
          (fn as any).wasBound = true;
          return fn;
        },
        enter: () => {},
        exit: () => {}
      }
    } as any;

    // Create a promise that rejects
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Use done() which should bind the error handler to process.domain
    rejectedPromise.done(
      () => {},
      (error: Error) => {
        // Verify the error handler was bound to domain
        expect((error as any).wasBound).toBe(true);
        expect(error.message).toBe("Test error");
        // Restore original process
        global.process = originalProcess;
        done();
      }
    );
  });
});