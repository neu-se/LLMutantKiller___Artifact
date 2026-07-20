const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress handler error handling", () => {
  it("should throw errors from progress handlers", () => {
    const error = new Error("Progress handler error");
    let errorThrown = false;

    // Set up a global error handler to catch the thrown error
    const originalOnerror = Q.onerror;
    Q.onerror = (e: Error) => {
      errorThrown = true;
      expect(e).toBe(error);
      Q.onerror = originalOnerror;
    };

    const deferred = Q.defer();
    const progressHandler = () => {
      throw error;
    };

    deferred.promise.then(null, null, progressHandler);
    deferred.resolve(42);

    return Q.delay(10).then(() => {
      expect(errorThrown).toBe(true);
    });
  });
});