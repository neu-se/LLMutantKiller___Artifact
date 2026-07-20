const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done unhandled error handling", () => {
  it("should properly handle unhandled errors in done", (done) => {
    // Track if error was thrown
    let errorThrown = false;

    // Create a rejected promise and call done without handlers
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Override the default error handler to track the error
    const originalOnerror = Q.onerror;
    Q.onerror = function(error) {
      errorThrown = true;
      expect(error.message).toBe("Test error");
    };

    // This should trigger the error handler
    rejectedPromise.done();

    // Give the nextTick a chance to execute
    setTimeout(() => {
      expect(errorThrown).toBe(true);
      Q.onerror = originalOnerror;
      done();
    }, 10);
  });
});