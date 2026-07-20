import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise valueOf behavior", () => {
  it("should return the resolved value when valueOf is called on a fulfilled deferred promise", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    
    // Wait for the promise to be resolved
    await deferred.promise;
    
    // After resolution, valueOf should return the fulfilled value (not undefined)
    const value = deferred.promise.valueOf();
    expect(value).toBe(42);
  });
});