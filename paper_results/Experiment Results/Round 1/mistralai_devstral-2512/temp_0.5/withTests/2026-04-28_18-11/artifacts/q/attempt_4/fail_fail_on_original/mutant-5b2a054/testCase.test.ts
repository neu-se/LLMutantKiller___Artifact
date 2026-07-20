import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in promise execution", () => {
  it("should properly handle uncaught exceptions in promise handlers", (done) => {
    // Track if the error was properly handled
    let errorHandled = false;

    // Create a promise that will throw an error
    const deferred = Q.defer();
    deferred.promise.then(() => {
      throw new Error("Test error");
    });

    // Set up a handler to catch the error
    deferred.promise.then(
      () => {
        // Should not reach here
        done(new Error("Promise should have been rejected"));
      },
      (error) => {
        errorHandled = true;
        done();
      }
    );

    // Force the promise to execute
    deferred.resolve();

    // Give time for async operations
    setTimeout(() => {
      if (!errorHandled) {
        done(new Error("Error was not properly handled"));
      }
    }, 100);
  });
});