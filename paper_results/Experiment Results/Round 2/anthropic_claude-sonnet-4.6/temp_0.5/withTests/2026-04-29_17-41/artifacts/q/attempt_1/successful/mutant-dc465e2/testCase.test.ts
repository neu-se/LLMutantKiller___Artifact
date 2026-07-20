import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout", () => {
  it("should resolve with the fulfilled value when promise fulfills before timeout", async () => {
    const deferred = Q.defer();
    
    const timeoutPromise = deferred.promise.timeout(500);
    
    deferred.resolve(42);
    
    const result = await timeoutPromise;
    expect(result).toBe(42);
  });
});