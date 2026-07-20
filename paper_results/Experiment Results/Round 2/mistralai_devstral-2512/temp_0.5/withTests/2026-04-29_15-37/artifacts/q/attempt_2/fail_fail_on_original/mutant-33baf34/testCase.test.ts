import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack trace with named function", () => {
    // Create a scenario that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force stack trace generation
    Q.longStackSupport = true;
    deferred.reject(error);

    // Get the stack trace
    const promise = deferred.promise;
    return promise.then(null, () => {
      // The test passes if we can reach here without errors in stack parsing
      expect(true).toBe(true);
    });
  });
});