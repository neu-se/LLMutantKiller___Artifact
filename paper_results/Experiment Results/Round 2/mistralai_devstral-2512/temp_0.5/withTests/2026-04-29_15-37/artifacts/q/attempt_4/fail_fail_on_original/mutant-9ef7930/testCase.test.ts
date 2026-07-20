// Test case to detect the mutation in Q.race function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should correctly handle array with one promise", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Set up a timeout to reject if the test hangs
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Test timed out")), 100);
    });

    // Race the promise against the timeout
    return Promise.race([
      Q.race([promise]).then(result => {
        expect(result).toBe("test value");
      }),
      timeoutPromise
    ]).then(() => {
      // Resolve the deferred after a short delay to ensure async behavior
      setTimeout(() => deferred.resolve("test value"), 10);
    });
  });
});