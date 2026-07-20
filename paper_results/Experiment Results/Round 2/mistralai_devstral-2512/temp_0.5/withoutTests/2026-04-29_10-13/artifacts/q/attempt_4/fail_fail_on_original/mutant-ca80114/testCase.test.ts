const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
  it("should handle errors differently in Node.js vs browser environments", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track whether the error was thrown synchronously (Node.js behavior)
    let errorThrownSynchronously = false;
    let errorThrownAsynchronously = false;

    // In the original code (isNodeJS check), errors in Node.js should be thrown synchronously
    // In the mutated code (always true), errors will always be thrown synchronously
    try {
      rejectedPromise.then(() => {}, () => {
        errorThrownAsynchronously = true;
        done();
      });
    } catch (e) {
      errorThrownSynchronously = true;
    }

    // Give a tick for any async error throwing
    setTimeout(() => {
      // In the original code with isNodeJS=true, the error should have been thrown synchronously
      // In the mutated code, it will always be thrown synchronously
      expect(errorThrownSynchronously).toBe(true);
      done();
    }, 10);
  });
});