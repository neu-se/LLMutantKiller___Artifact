const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should correctly create objects when Object.create is not available", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    // Mock Object.create to be undefined to test the polyfill
    Object.create = undefined;

    try {
      // Test that Q can still create promises when Object.create is not available
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