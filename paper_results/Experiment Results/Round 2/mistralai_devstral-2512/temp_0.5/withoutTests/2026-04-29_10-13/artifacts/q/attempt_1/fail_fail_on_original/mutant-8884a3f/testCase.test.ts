import { Q } from "./q.js";

describe("Q long stack support", () => {
  it("should capture long stack traces when enabled", () => {
    // Enable long stack support
    Q.longStackSupport = true;

    // Create a chain of promises to generate a stack trace
    const deferred1 = Q.defer();
    const promise1 = deferred1.promise;

    const promise2 = promise1.then(() => {
      throw new Error("Test error");
    });

    const promise3 = promise2.then(() => {
      // This should not be reached
      return "success";
    });

    // Reject the first promise to trigger the error
    deferred1.reject(new Error("Initial error"));

    // Return a promise that should be rejected with a long stack trace
    return promise3.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error: Error) => {
        // Check that the error has a stack trace
        expect(error.stack).toBeDefined();
        // The stack trace should contain multiple frames due to long stack support
        const stackLines = error.stack!.split('\n');
        expect(stackLines.length).toBeGreaterThan(5);
        // Should contain the separator for long stack traces
        expect(error.stack).toContain("From previous event:");
      }
    );
  });
});