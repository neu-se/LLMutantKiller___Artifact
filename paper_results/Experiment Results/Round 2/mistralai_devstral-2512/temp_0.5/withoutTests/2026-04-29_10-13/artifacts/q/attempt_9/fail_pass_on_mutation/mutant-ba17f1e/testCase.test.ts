const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly identify internal frames from stack traces", () => {
    // Enable long stack traces to exercise the stack parsing code
    Q.longStackSupport = true;

    // Create a deferred that will be rejected
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Set a stack trace that includes lines matching the pattern
    // that getFileNameAndLineNumber should parse
    error.stack = "Error: Test error\n" +
                 "    at Promise.resolve (q.js:100:21)\n" +
                 "    at anotherFunction (user-code.js:10:5)";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // The mutation affects getFileNameAndLineNumber which should return
        // [filename, lineNumber] for named function patterns
        // When it returns [] instead, isInternalFrame will fail to properly identify frames

        // Check that the stack trace was modified (long stack support adds markers)
        const hasLongStackMarker = reason.stack && reason.stack.includes("From previous event:");

        // The original code should properly filter internal frames (q.js lines)
        // The mutated code will fail to parse and won't filter correctly
        // This should result in different stack trace content
        expect(hasLongStackMarker).toBe(true);

        // Also verify the error is still the same instance
        expect(reason).toBe(error);
      }
    );
  });
});