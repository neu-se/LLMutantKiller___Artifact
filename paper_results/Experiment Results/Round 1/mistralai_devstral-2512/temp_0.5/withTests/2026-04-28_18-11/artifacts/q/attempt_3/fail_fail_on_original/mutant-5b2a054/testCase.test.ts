import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in non-Node environments", () => {
  it("should re-throw uncaught exceptions asynchronously", (done) => {
    // This test verifies that uncaught exceptions in promise handlers
    // are re-thrown asynchronously in non-Node environments
    const originalError = new Error("Test error");

    // Set up error handler
    let errorCaught = false;
    const originalOnerror = Q.onerror;
    Q.onerror = function(error: Error) {
      if (error === originalError) {
        errorCaught = true;
        Q.onerror = originalOnerror;
        done();
      }
    };

    // Create a promise that will throw an error in a way that triggers the mutation point
    Q.defer().promise.then(() => {
      throw originalError;
    });

    // Give time for the async re-throw to happen
    setTimeout(() => {
      if (!errorCaught) {
        Q.onerror = originalOnerror;
        done(new Error("Expected error was not thrown asynchronously"));
      }
    }, 100);
  });
});