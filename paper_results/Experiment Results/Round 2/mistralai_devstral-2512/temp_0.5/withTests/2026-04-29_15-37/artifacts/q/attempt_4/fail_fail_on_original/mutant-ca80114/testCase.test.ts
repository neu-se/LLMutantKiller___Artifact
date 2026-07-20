// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-ca80114/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should handle errors differently in Node.js vs browser environments", () => {
    // This test verifies that error handling behavior differs based on the environment
    // The mutation changes `if (isNodeJS)` to `if (true)`, which forces Node.js behavior
    // even in non-Node environments

    const error = new Error("Test error");
    let errorHandled = false;

    // Set up error handler
    Q.onerror = (err: any) => {
      errorHandled = true;
    };

    // Create a promise that will throw an error in a task
    const deferred = Q.defer();
    deferred.promise.then(() => {
      throw error;
    });

    // In Node.js: errors in tasks should be re-thrown synchronously and caught by Q.onerror
    // In browser: errors should be re-thrown asynchronously
    // The mutation forces Node.js behavior always

    return Q.delay(10).then(() => {
      // In the original code running in Node.js, errorHandled should be true
      // In browser environment, errorHandled would be false
      // The mutation makes it always behave like Node.js
      if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        // Running in Node.js - error should be handled
        expect(errorHandled).toBe(true);
      } else {
        // Running in browser - error should NOT be handled (original behavior)
        expect(errorHandled).toBe(false);
      }
    });
  });
});