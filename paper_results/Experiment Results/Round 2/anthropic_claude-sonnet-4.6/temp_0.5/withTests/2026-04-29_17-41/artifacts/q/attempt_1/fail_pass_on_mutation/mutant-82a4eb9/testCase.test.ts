import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module CommonJS export", () => {
  it("should export Q as a function with all expected properties when loaded as a CommonJS module", () => {
    // Verify the module loaded correctly via CommonJS path (typeof exports === "object" && typeof module === "object")
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    expect(typeof Q.when).toBe("function");
    expect(typeof Q.promise).toBe("function");
    
    // Verify basic promise creation works
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.promise).toBe("object");
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
    
    // Verify Q(value) returns a fulfilled promise
    const fulfilled = Q(42);
    expect(fulfilled.isFulfilled()).toBe(true);
    expect(fulfilled.inspect()).toEqual({ state: "fulfilled", value: 42 });
  });
});