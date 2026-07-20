const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress handler error handling", () => {
  it("should throw errors from progress handlers", () => {
    const error = new Error("Progress handler error");
    let errorThrown = false;

    // Override the global error handler
    const originalOnerror = Q.onerror;
    Q.onerror = (e: Error) => {
      if (e.message === error.message) {
        errorThrown = true;
      }
    };

    // Create a promise with a progress handler that throws
    const deferred = Q.defer();
    deferred.promise.then(
      null,
      null,
      () => {
        throw error;
      }
    );

    // Resolve the promise
    deferred.resolve(42);

    // Give time for the error to propagate
    return Q.delay(10).then(() => {
      Q.onerror = originalOnerror;
      expect(errorThrown).toBe(true);
    });
  });
});