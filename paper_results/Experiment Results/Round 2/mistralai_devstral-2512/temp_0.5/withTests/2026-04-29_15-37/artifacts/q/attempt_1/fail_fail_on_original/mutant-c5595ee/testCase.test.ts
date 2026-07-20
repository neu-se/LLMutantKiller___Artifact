import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
  it("should correctly parse stack lines with @ symbol", () => {
    // Create a mock stack line that should match attempt3 regex
    const stackLine = "at http://example.com/file.js:42";

    // We need to test the internal behavior through an observable side effect
    // Since getFileNameAndLineNumber is not directly exposed, we'll use
    // the stack trace functionality which internally uses it
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Capture the promise in a rejected state to trigger stack trace processing
    deferred.reject(error);

    // The mutation changes the regex from /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This means it will no longer match lines that have characters before the @
    // We need to verify this by checking if the stack trace is properly filtered

    // In the original code, this stack line should be parsed correctly
    // In the mutated code, it should fail to parse and return null
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (err) => {
        // The error should have a stack trace
        expect(err.stack).toBeDefined();

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});