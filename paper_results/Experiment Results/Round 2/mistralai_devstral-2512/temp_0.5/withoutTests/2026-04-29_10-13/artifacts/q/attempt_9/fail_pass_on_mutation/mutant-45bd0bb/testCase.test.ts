const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation with Object.create availability", () => {
  it("should use Object.create when available and fallback when not", () => {
    // Test with Object.create available
    const originalCreate = Object.create;
    let testPassed = false;

    try {
      // First test: Object.create available
      Object.create = originalCreate;
      const deferred1 = Q.defer();
      const promise1 = deferred1.promise;

      // Verify basic functionality
      expect(typeof promise1.then).toBe("function");

      // Test promise resolution
      promise1.then((value: unknown) => {
        testPassed = value === "test1";
      });
      deferred1.resolve("test1");

      // Now test without Object.create
      Object.create = undefined as any;
      const deferred2 = Q.defer();
      const promise2 = deferred2.promise;

      // Verify basic functionality still works
      expect(typeof promise2.then).toBe("function");

      // Test promise resolution
      promise2.then((value: unknown) => {
        testPassed = testPassed && value === "test2";
      });
      deferred2.resolve("test2");

      // Give time for async operations
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(testPassed).toBe(true);
          resolve();
        }, 10);
      });

    } finally {
      Object.create = originalCreate;
    }
  });
});