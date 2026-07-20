const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done() with process.domain", () => {
  it("should correctly check process.domain existence with null process", (done) => {
    // Track whether bind was called
    let bindCalled = false;

    // Create a mock process object with domain
    const originalProcess = global.process;
    global.process = {
      nextTick: (callback: Function) => setTimeout(callback, 0),
      domain: {
        bind: (fn: Function) => {
          bindCalled = true;
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
        expect(bindCalled).toBe(true);
        expect(error.message).toBe("Test error");
        // Restore original process
        global.process = originalProcess;
        done();
      }
    );
  });
});