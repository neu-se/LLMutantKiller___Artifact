import { Q } from "./q.js";

describe("Q promise deferred resolution", () => {
  it("should correctly handle deferred resolution with multiple messages", (done) => {
    const deferred = Q.defer();
    let callCount = 0;

    // Add multiple handlers before resolving
    deferred.promise.then(() => {
      callCount++;
    });
    deferred.promise.then(() => {
      callCount++;
    });

    // Resolve after adding handlers
    deferred.resolve("test");

    // Give time for async operations to complete
    setTimeout(() => {
      // With the mutation (if (true)), messages would be undefined
      // and handlers wouldn't be called properly
      expect(callCount).toBe(2);
      done();
    }, 10);
  });
});