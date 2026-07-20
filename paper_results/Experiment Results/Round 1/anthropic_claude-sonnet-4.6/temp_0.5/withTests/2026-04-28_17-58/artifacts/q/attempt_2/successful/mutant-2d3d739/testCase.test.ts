import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation detection", () => {
  it("should preserve the original rejection reason when a rejected promise is chained through another then handler with long stack support enabled", () => {
    Q.longStackSupport = true;

    const originalError = new Error("original error");

    // Chain two .then() calls so that the second rejection handler
    // receives the error after makeStackTraceLong has been called.
    // With the mutation, makeStackTraceLong throws TypeError (false is not a function),
    // which gets caught in _rejected's try-catch and re-rejects with TypeError.
    // The second handler then receives TypeError, not originalError.
    return Q.reject(originalError)
      .then(null, (err: Error) => {
        // Re-reject to trigger makeStackTraceLong again in the next handler
        throw err;
      })
      .then(null, (err: Error) => {
        Q.longStackSupport = false;
        expect(err).toBe(originalError);
      });
  });
});