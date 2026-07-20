import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should resolve with the value when the promise fulfills before the timeout", async () => {
    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(1000);
    
    deferred.resolve(42);
    
    const result = await timeoutPromise;
    expect(result).toBe(42);
  });
});