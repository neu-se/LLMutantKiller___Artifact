// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization behavior", () => {
  it("should have consistent behavior across multiple imports", () => {
    // First import
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Clear cache and import again
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Both imports should return the same Q instance
    expect(Q1).toBe(Q2);

    // Verify basic functionality works
    const deferred = Q1.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Test promise creation
    const promise = Q1.resolve(42);
    expect(promise).toBeDefined();

    return promise.then(value => {
      expect(value).toBe(42);
    });
  });
});