// Test case to detect the mutation in Q.race function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should correctly handle array with one promise", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve immediately to test the race condition
    deferred.resolve("test value");

    return Q.race([promise]).then((result: unknown) => {
      expect(result).toBe("test value");
    });
  });
});