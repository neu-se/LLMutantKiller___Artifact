import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module CommonJS export", () => {
  it("should export Q as a function with promise capabilities when loaded as a CommonJS module", () => {
    // The module should be properly loaded via CommonJS (module.exports = definition())
    // This requires BOTH typeof exports === "object" AND typeof module === "object"
    // The mutation changes && to ||, which could cause issues if only one condition is true
    
    // Verify the module exported correctly as a function (not undefined or wrong type)
    expect(typeof Q).toBe("function");
    
    // Verify core Q API methods exist - these only exist if definition() was called correctly
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.promise).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    expect(typeof Q.when).toBe("function");
    
    // Verify Q actually works - create a deferred and resolve it
    const deferred = Q.defer();
    expect(typeof deferred.promise).toBe("object");
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
    
    // Verify Q(value) returns a fulfilled promise
    const fulfilled = Q(42);
    expect(Q.isFulfilled(fulfilled)).toBe(true);
    expect(fulfilled.inspect().value).toBe(42);
    
    // Verify the module object itself is the Q function (module.exports was set correctly)
    // If the || mutation caused a different branch to be taken, module.exports would not be set
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(qModule).toBe(Q);
    expect(typeof qModule).toBe("function");
  });
});