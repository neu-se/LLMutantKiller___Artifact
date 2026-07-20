const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done() with process.domain", () => {
  it("should handle unhandled errors correctly when process.domain is present", (done) => {
    // Create a mock process object with domain and nextTick
    const mockProcess = {
      domain: {
        bind: (fn: Function) => {
          // This will only be called in the original code
          return fn;
        },
        enter: () => {},
        exit: () => {}
      },
      nextTick: (fn: Function) => setTimeout(fn, 0)
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    (global as any).process = mockProcess;

    let bindCalled = false;

    // Override the bind method to track if it's called
    mockProcess.domain.bind = (fn: Function) => {
      bindCalled = true;
      return fn;
    };

    try {
      const promise = Q.reject(new Error("Test error"));
      let errorCaught = false;

      promise.done(
        () => {},
        (err: Error) => {
          errorCaught = true;
          expect(err.message).toBe("Test error");
        }
      );

      // Give the async operation time to complete
      setTimeout(() => {
        expect(errorCaught).toBe(true);
        // In the original code, bind should be called
        // In the mutated code, bind won't be called
        expect(bindCalled).toBe(true);
        (global as any).process = originalProcess;
        done();
      }, 10);
    } catch (err) {
      (global as any).process = originalProcess;
      done(err);
    }
  });
});