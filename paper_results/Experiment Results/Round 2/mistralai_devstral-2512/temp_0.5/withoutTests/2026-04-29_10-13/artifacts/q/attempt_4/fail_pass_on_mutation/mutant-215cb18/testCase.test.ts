const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly handle promise stack traces with long stack support", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a chain of promises to test stack trace handling
    return Q.delay(1)
      .then(() => {
        throw error;
      })
      .catch((e: Error) => {
        // The mutation affects object_defineProperty which is used in stack trace handling
        // In the mutated version, the stack property won't be properly set
        expect(e.stack).toBeDefined();
        expect(e.stack!.length).toBeGreaterThan(0);
        expect(e.stack).toContain("Test error");

        // Try to access the stack property which relies on object_defineProperty
        const stackLines = e.stack!.split('\n');
        expect(stackLines.length).toBeGreaterThan(1);

        return Q.resolve();
      });
  });
});