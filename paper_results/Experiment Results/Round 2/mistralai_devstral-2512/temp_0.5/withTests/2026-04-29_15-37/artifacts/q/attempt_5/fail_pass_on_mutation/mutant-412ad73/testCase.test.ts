// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library module loading", () => {
  it("should properly load Q in CommonJS environment", () => {
    // Verify Q is properly loaded as a CommonJS module
    expect(Q).toBeDefined();
    expect(typeof Q).toBe('function');

    // Test basic functionality
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe('function');
    expect(typeof deferred.reject).toBe('function');

    // Test promise creation
    const promise = deferred.promise;
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe('function');

    // Test that Q can create fulfilled promises
    const fulfilled = Q(42);
    expect(fulfilled.isFulfilled()).toBe(true);

    // Test that Q can create rejected promises
    const rejected = Q.reject(new Error("test"));
    expect(rejected.isRejected()).toBe(true);
  });
});