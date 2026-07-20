import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q defer promise valueOf", () => {
  it("should return the resolved value when promise is fulfilled", async () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    
    // Wait for the promise to resolve
    await deferred.promise;
    
    // After resolution, valueOf should return the nearer value (42), not the promise itself
    const value = deferred.promise.valueOf();
    expect(value).toBe(42);
  });
});