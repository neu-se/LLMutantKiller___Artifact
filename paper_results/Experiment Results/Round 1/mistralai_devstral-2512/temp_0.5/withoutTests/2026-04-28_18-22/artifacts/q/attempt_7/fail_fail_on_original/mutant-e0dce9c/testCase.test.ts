const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the rejection reason when state is rejected in mutated code", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    const promise = deferred.promise;
    deferred.reject(error);

    // In the original code, valueOf() returns the promise when state is rejected
    // In the mutated code, it should return the inspected value (the error)
    const result = promise.valueOf();
    if (result instanceof Error) {
      expect(result).toBe(error);
    } else {
      expect(result).toBe(promise);
    }
  });
});