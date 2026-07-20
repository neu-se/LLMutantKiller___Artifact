const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress handler error handling", () => {
  it("should throw errors from progress handlers", () => {
    const error = new Error("Progress handler error");
    let errorThrown = false;

    // Set up a global error handler to catch the thrown error
    const originalOnerror = Q.onerror;
    Q.onerror = (e: Error) => {
      if (e === error) {
        errorThrown = true;
      }
    };

    const promise = Q.resolve(42);
    const progressHandler = () => {
      throw error;
    };

    promise.then(null, null, progressHandler);

    return Q.delay(10).then(() => {
      Q.onerror = originalOnerror;
      expect(errorThrown).toBe(true);
    });
  });
});