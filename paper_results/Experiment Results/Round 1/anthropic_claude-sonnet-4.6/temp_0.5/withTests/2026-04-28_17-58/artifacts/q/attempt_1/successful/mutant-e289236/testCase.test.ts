import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf after resolution", () => {
  it("should reflect the resolved value after the deferred is resolved", () => {
    const deferred = Q.defer();
    
    // Before resolution, inspect should show pending
    expect(deferred.promise.inspect()).toEqual({ state: "pending" });
    
    // Resolve the deferred
    deferred.resolve(42);
    
    // After resolution, inspect should show fulfilled with value 42
    const inspected = deferred.promise.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
    
    // valueOf should return the actual value (not the promise itself)
    // since the promise is fulfilled
    const val = deferred.promise.valueOf();
    expect(val).toBe(42);
  });
});