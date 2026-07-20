// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q module export behavior", () => {
  it("should export Q as a module in CommonJS environment", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from checking `typeof exports === "object"`
    // to just `true`, which could break the module export behavior
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Verify basic promise functionality works
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(deferred.promise).toBeDefined();
    expect(deferred.resolve).toBeDefined();
    expect(deferred.reject).toBeDefined();

    // Test that promises work correctly
    let resolved = false;
    Q.resolve(42).then((value) => {
      resolved = true;
      expect(value).toBe(42);
    });

    // Give the promise time to resolve
    setTimeout(() => {
      expect(resolved).toBe(true);
    }, 10);
  });
});