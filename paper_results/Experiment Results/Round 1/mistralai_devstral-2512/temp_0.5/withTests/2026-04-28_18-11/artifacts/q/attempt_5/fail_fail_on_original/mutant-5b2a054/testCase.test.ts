import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error rethrowing behavior", () => {
  it("should rethrow errors in non-Node environments", (done) => {
    // Create a promise that throws an error
    const error = new Error("Test error");
    const deferred = Q.defer();

    // Set up a handler to detect if the error was rethrown
    let errorRethrown = false;
    const originalOnerror = Q.onerror;
    Q.onerror = function(e: Error) {
      if (e === error) {
        errorRethrown = true;
        Q.onerror = originalOnerror;
      }
    };

    // Create a scenario that triggers the error handling path
    deferred.promise.then(() => {
      throw error;
    });

    // Force execution
    deferred.resolve();

    // Check if error was rethrown
    setTimeout(() => {
      Q.onerror = originalOnerror;
      if (errorRethrown) {
        done();
      } else {
        done(new Error("Error was not rethrown as expected"));
      }
    }, 100);
  });
});