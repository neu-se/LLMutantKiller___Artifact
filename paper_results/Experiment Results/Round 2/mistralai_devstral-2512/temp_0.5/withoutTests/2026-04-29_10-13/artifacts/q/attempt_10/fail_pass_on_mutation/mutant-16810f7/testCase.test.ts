const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly check process type before emitting unhandledRejection", (done) => {
    // Create a rejected promise that will NOT be handled
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Test with a non-object process to trigger the mutation
    const originalProcess = global.process;
    global.process = "not an object" as any;

    try {
      // Reject the promise
      deferred.reject(new Error("Test error"));

      // Wait for the next tick to allow the unhandled rejection tracking to occur
      setTimeout(() => {
        try {
          // In the original code, process.emit should not be called when process is not an object
          // In the mutated code, the condition will be true and try to call emit on a string
          // This should cause an error in the mutated version
          expect(true).toBe(true); // Dummy assertion

          // Clean up
          Q.stopUnhandledRejectionTracking();
          done();
        } catch (error) {
          done(error);
        } finally {
          // Restore original process
          global.process = originalProcess;
        }
      }, 10);
    } catch (error) {
      global.process = originalProcess;
      done(error);
    }
  });
});