const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should use the polyfill when Object.create exists but returns undefined", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    // Mock Object.create to return undefined (simulating the mutant behavior)
    Object.create = function() {
      return undefined;
    };

    try {
      // Test that Q can still create promises when Object.create returns undefined
      const promise = Q.resolve(42);
      expect(promise).toBeDefined();

      // Verify the promise behaves correctly
      return promise.then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore Object.create
      Object.create = originalCreate;
    }
  });
});