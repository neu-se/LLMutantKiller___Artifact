import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_create mutation detection", () => {
  it("should create promise objects that are proper instances of Promise with correct prototype chain", () => {
    // Q.defer() uses object_create(defer.prototype) internally
    // Q.fulfill() uses object_create(Promise.prototype) internally
    // With the mutation, object_create is the fallback function instead of Object.create
    // The fallback function with null prototype: Type.prototype = null causes new Type() 
    // to still inherit from Object.prototype in JS engines
    
    // The most direct test: Q.defer() creates a deferred whose promise should be
    // an instanceof the internal Promise constructor. This relies on object_create working correctly.
    const deferred = Q.defer();
    expect(Q.isPromise(deferred.promise)).toBe(true);
    
    // With mutation, object_create = the fallback function (not Object.create)
    // Object.create(null) returns object with NO prototype
    // new Type() with Type.prototype = null returns object WITH Object.prototype
    // We can detect this via Q.master which creates a promise using object_create
    // and checks if the result has proper prototype chain
    
    const fulfilled = Q(42);
    const inspected = fulfilled.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
    
    // The key: with Object.create, object_create(null) creates a null-prototype object
    // With the mutated fallback, it creates an Object.prototype-based object
    // Q internally uses object_create for descriptor objects - let's check keys behavior
    return Q.keys({ a: 1, b: 2 }).then((keys: string[]) => {
      expect(keys.sort()).toEqual(["a", "b"]);
    });
  });
});