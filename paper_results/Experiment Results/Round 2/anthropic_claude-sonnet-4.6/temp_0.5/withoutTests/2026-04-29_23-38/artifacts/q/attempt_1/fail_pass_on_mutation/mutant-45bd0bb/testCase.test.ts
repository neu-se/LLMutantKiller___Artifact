import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("should create a working deferred with resolve and reject", async () => {
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
    expect(deferred.promise).toBeDefined();
    
    deferred.resolve(42);
    const value = await deferred.promise;
    expect(value).toBe(42);
    
    // Test that Q() wrapping works with instanceof check
    const p = Q(42);
    expect(Q.isFulfilled(p)).toBe(true);
    
    // Test that a resolved promise is recognized as a Promise instance
    const d2 = Q.defer();
    // passing a promise to Q should return it directly (instanceof Promise check)
    const p2 = Q(d2.promise);
    expect(p2).toBe(d2.promise);
  });
});