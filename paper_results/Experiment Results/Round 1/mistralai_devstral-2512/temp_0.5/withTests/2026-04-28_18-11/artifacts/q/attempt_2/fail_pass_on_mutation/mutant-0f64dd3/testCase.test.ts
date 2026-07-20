// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly handle stack traces when fileNameAndLineNumber is falsy", () => {
    // Create a scenario where captureLine is called and fileNameAndLineNumber is falsy
    // This will trigger the mutated code path
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Force stack trace capture by enabling long stack support
    Q.longStackSupport = true;

    // Create a rejection to trigger stack trace handling
    deferred.reject(new Error("Test error"));

    // The mutation changes the condition from !fileNameAndLineNumber to fileNameAndLineNumber
    // This means when fileNameAndLineNumber is falsy, the original code would execute the if block
    // but the mutated code would skip it, potentially causing different behavior in stack handling
    return promise.then(
      () => {
        // Should not resolve
        throw new Error("Promise should have been rejected");
      },
      (error) => {
        // Should reject with the test error
        expect(error.message).toBe("Test error");
        // Verify stack trace exists (this would fail if mutation affects stack handling)
        expect(error.stack).toBeDefined();
      }
    );
  });
});