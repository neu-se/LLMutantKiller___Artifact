import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("long stack trace should preserve the error message line in stack", (done) => {
    Q.longStackSupport = true;

    // Create a deferred so the promise gets a .stack property
    const deferred = Q.defer();

    deferred.promise.then(null, function(capturedErr: Error) {
      Q.longStackSupport = false;
      const stack = capturedErr.stack || "";
      try {
        // The first line of a stack trace is typically "Error: message"
        // getFileNameAndLineNumber returns undefined for this line
        // Original: isInternalFrame returns false (no fileNameAndLineNumber) → line kept
        // Mutation: isInternalFrame returns true → line filtered out → stack is ""
        expect(stack).not.toBe("");
        done();
      } catch(e) {
        done(e);
      }
    });

    const err = new Error("test-error-message");
    deferred.reject(err);
  });
});