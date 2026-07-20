const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress handler error handling", () => {
  it("should throw errors from progress handlers", () => {
    const error = new Error("Progress handler error");
    let errorCaught = false;

    // Create a promise that will have a progress handler
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Set up the progress handler that throws
    const progressHandler = () => {
      throw error;
    };

    // Use done() to catch uncaught errors
    promise.then(null, null, progressHandler).done(
      () => {},
      (e) => {
        if (e === error) {
          errorCaught = true;
        }
      }
    );

    // Resolve the promise to trigger the progress handler
    deferred.resolve(42);

    return Q.delay(10).then(() => {
      expect(errorCaught).toBe(true);
    });
  });
});