// Test to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module export behavior", () => {
  it("should export Q when running in a CommonJS environment", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from checking `typeof exports === "object"`
    // to just `true`, which could affect the module export behavior
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Verify basic Q functionality to ensure it's the correct export
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(deferred.promise).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Test that Q can create a fulfilled promise
    const fulfilledPromise = Q(42);
    expect(fulfilledPromise.isFulfilled()).toBe(true);

    // Test that Q can create a rejected promise
    const rejectedPromise = Q.reject(new Error("test"));
    expect(rejectedPromise.isRejected()).toBe(true);
  });
});