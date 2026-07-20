const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly identify internal frames in stack traces", () => {
    // Enable long stack traces to exercise the stack parsing code
    Q.longStackSupport = true;

    // Create a deferred that will be rejected
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Store the original stack for comparison
    const originalStack = error.stack;

    // Reject the promise which will trigger stack trace processing
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // The mutation affects getFileNameAndLineNumber which returns [filename, lineNumber]
        // When it returns [] instead, isInternalFrame will fail to properly identify frames
        // This should cause the stack trace filtering to behave differently

        // Check that the stack trace was modified (long stack support adds "From previous event")
        const hasLongStackMarker = reason.stack && reason.stack.includes("From previous event:");

        // The original code should produce a modified stack trace
        // The mutated code should fail to properly filter frames
        expect(hasLongStackMarker).toBe(true);

        // Also verify the error is still the same instance
        expect(reason).toBe(error);
      }
    );
  });
});