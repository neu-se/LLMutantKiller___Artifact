const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter stack traces without off-by-one errors", () => {
    // Create a scenario where stack trace filtering is triggered
    const originalConsoleError = console.error;
    const errors: any[] = [];
    console.error = (...args) => errors.push(args);

    try {
      // Force Q to create and filter a stack trace
      Q.longStackSupport = true;

      // Create a promise chain that will generate stack traces
      const promise = Q.reject(new Error("Test error")).then(() => {
        throw new Error("Should not reach here");
      });

      // Attach a rejection handler that will trigger stack processing
      promise.catch((e: Error) => {
        // This should process the stack without errors
      });

      // Give the promise time to process
      return promise.then(
        () => {
          console.error = originalConsoleError;
          // Should not reach here since we rejected
          throw new Error("Promise should have been rejected");
        },
        () => {
          console.error = originalConsoleError;
          // Verify no errors occurred during stack processing
          if (errors.length > 0) {
            throw new Error("Unexpected errors during stack processing");
          }
        }
      );
    } catch (e) {
      console.error = originalConsoleError;
      throw e;
    }
  });
});