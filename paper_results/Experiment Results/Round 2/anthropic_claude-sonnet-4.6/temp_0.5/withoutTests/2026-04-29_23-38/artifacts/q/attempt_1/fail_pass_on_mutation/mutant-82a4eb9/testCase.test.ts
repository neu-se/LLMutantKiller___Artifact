import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should export Q as a function via CommonJS module.exports", () => {
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.promise).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    
    // Verify Q actually works - create a deferred and resolve it
    const deferred = Q.defer();
    deferred.resolve(42);
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});