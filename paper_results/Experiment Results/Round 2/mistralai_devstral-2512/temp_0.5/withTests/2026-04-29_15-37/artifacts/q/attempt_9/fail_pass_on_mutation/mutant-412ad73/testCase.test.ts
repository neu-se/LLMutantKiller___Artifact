// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library module loading", () => {
  it("should load Q module without errors", () => {
    // Test that Q is properly loaded
    expect(Q).toBeDefined();
    expect(typeof Q).toBe('function');

    // Test basic Q functionality
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe('function');

    // Test promise creation
    const promise = Q(42);
    expect(promise.then).toBeDefined();

    // This test should pass on original code but fail on mutated code
    // because the mutation changes the module loading logic
    expect(Q.isPromise(promise)).toBe(true);
  });
});