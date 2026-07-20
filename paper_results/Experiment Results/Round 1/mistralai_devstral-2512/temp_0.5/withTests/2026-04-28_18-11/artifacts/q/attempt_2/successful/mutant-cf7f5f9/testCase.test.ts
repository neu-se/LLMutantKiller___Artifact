// Test case to detect the mutation in the progress notification error handling
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification error handling", () => {
  it("should call Q.onerror when an error is thrown in progress listener", (done) => {
    // Setup a deferred promise and progress listener that throws
    const deferred = Q.defer();
    const testError = new Error("test error");

    // Track if onerror was called
    let onerrorCalled = false;

    // Set up Q.onerror to track the call
    Q.onerror = (error: Error) => {
      onerrorCalled = true;
      expect(error).toBe(testError);
      done();
    };

    // Set up a progress listener that throws
    deferred.promise.progress(() => {
      throw testError;
    });

    // Trigger the progress notification
    deferred.notify();

    // Clean up after a short delay to ensure the test completes
    setTimeout(() => {
      if (!onerrorCalled) {
        done(new Error("Q.onerror was not called"));
      }
    }, 100);
  });
});