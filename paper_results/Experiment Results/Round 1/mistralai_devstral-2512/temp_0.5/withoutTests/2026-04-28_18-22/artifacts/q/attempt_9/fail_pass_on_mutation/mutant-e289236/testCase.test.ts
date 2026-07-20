import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise rejection handling", () => {
  it("should properly handle rejection with multiple error handlers", (done) => {
    const deferred = defer();
    const errors: Error[] = [];

    // Add multiple error handlers before rejecting
    deferred.promise.then(null, (err) => {
      errors.push(err);
    });

    deferred.promise.then(null, (err) => {
      errors.push(err);
    });

    // Reject after adding handlers
    const testError = new Error("test error");
    deferred.reject(testError);

    setTimeout(() => {
      // With the mutation (if (true)), the messages array would be undefined
      // preventing proper error propagation to all handlers
      expect(errors.length).toBe(2);
      expect(errors[0]).toBe(testError);
      expect(errors[1]).toBe(testError);
      done();
    }, 10);
  });
});