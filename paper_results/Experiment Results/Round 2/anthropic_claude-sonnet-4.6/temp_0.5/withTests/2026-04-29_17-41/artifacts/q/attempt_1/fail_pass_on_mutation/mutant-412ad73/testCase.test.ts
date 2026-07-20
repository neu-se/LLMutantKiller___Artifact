import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading and basic functionality", () => {
  it("should export a working Q function that can create and resolve promises", () => {
    // Verify the module loaded correctly and exports a functional Q
    expect(typeof Q).toBe("function");
    
    // Test basic promise creation and resolution
    const fulfilled = Q(42);
    expect(Q.isPromise(fulfilled)).toBe(true);
    expect(fulfilled.isFulfilled()).toBe(true);
    expect(fulfilled.inspect()).toEqual({ state: "fulfilled", value: 42 });
    
    // Test defer
    const deferred = Q.defer();
    expect(Q.isPromise(deferred.promise)).toBe(true);
    expect(deferred.promise.isPending()).toBe(true);
    
    deferred.resolve(100);
    expect(deferred.promise.isFulfilled()).toBe(true);
    expect(deferred.promise.inspect()).toEqual({ state: "fulfilled", value: 100 });
    
    // Test reject
    const rejected = Q.reject(new Error("test"));
    expect(rejected.isRejected()).toBe(true);
    
    // Test Q.resolve alias
    expect(Q.resolve).toBe(Q);
  });
});