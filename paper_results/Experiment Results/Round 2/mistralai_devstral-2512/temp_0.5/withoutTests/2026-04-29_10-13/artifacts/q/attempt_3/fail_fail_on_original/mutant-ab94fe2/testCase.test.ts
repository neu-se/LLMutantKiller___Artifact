const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done unhandled error handling", () => {
  it("should throw unhandled errors when Q.onerror is not defined", (done) => {
    // Store original onerror handler
    const originalOnerror = Q.onerror;
    Q.onerror = undefined;

    // Create a rejected promise and call done without handlers
    const rejectedPromise = Q.reject(new Error("Test error"));

    // This should throw the error in the next tick
    rejectedPromise.done();

    // Give the nextTick a chance to execute
    setTimeout(() => {
      Q.onerror = originalOnerror;
      done();
    }, 10);
  });
});