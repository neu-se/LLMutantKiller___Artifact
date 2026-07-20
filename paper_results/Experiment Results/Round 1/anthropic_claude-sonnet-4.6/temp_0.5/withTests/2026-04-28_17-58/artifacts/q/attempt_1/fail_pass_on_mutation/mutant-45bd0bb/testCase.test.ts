import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality with object_create", () => {
  it("should create a working deferred promise that resolves correctly", () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      // Verify the promise has proper prototype chain from Promise.prototype
      expect(typeof deferred.promise.then).toBe("function");
      expect(typeof deferred.promise.inspect).toBe("function");
      // Object.create(Promise.prototype) should give an object that is instanceof Promise
      expect(Q.isPromise(deferred.promise)).toBe(true);
    });
  });
});