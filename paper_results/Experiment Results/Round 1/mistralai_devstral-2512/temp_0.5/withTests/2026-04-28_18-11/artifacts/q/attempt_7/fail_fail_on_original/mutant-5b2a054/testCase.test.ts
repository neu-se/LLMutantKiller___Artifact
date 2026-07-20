import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in promise execution", () => {
  it("should properly rethrow uncaught exceptions in non-Node environments", (done) => {
    // Create a promise that will throw an error
    const error = new Error("Test error");
    const deferred = Q.defer();

    // Set up a handler to detect if the error was rethrown
    let errorRethrown = false;
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = function(e: Error) {
      if (e === error) {
        errorRethrown = true;
        (Q as any).onerror = originalOnerror;
      }
    };

    // Create a scenario that triggers the error handling path
    // This will cause the error to be thrown in the runSingle function
    deferred.promise.then(() => {
      throw error;
    });

    // Force execution
    deferred.resolve();

    // Check if error was rethrown
    setTimeout(() => {
      (Q as any).onerror = originalOnerror;
      if (errorRethrown) {
        done();
      } else {
        done(new Error("Error was not rethrown as expected"));
      }
    }, 100);
  });
});