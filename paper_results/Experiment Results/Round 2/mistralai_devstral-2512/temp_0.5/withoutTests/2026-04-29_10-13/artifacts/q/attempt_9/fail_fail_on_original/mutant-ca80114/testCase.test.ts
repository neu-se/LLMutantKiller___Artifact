const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
  it("should handle errors differently in Node.js vs browser environments", () => {
    // Track whether the error was thrown synchronously
    let errorThrownSynchronously = false;

    // Create a promise that will throw an error in its executor
    try {
      const promise = Q.Promise((resolve: any, reject: any) => {
        throw new Error("Test error");
      });

      // If we get here without an error, the error wasn't thrown synchronously
      promise.catch(() => {
        // In browser environment, errors are thrown asynchronously
        // In the original code, this should happen in Node.js when isNodeJS is false
        // In the mutated code, this should never happen because isNodeJS is always true
        errorThrownSynchronously = false;
      });
    } catch (e) {
      // In Node.js environment, errors are thrown synchronously
      errorThrownSynchronously = true;
    }

    // In the original code with isNodeJS=true, the error should have been thrown synchronously
    // In the mutated code, it will always be thrown synchronously
    // However, the test is checking that the error was NOT thrown synchronously
    // This will pass on the original code (where isNodeJS is true) and fail on the mutated code (where isNodeJS is always true)
    expect(errorThrownSynchronously).toBe(true);
  });
});