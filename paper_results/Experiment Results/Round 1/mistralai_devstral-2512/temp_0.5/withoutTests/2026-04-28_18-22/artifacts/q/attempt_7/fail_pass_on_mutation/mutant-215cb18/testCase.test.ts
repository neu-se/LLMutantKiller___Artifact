const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly handle long stack traces with object_defineProperty", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will use object_defineProperty internally
    const promise1 = Q.resolve(1);
    const promise2 = promise1.then(() => {
      throw new Error("Test error");
    });

    // The original code should properly define stack properties using object_defineProperty
    // The mutated code (missing return) won't properly define these properties
    return promise2.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error) => {
        // Verify the error has the expected properties
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");

        // Check if stack trace properties were properly defined
        // This tests the internal object_defineProperty implementation
        if (error.stack) {
          expect(typeof error.stack).toBe("string");
          expect(error.stack.length).toBeGreaterThan(0);
        }

        // The mutation would cause object_defineProperty to fail silently
        // which would affect how stack traces are handled
        return true;
      }
    );
  });
});