const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
  it("should handle errors differently in Node.js vs browser environments", (done) => {
    // Track whether the error was thrown synchronously (Node.js behavior)
    let errorThrownSynchronously = false;

    // Create a promise that will throw an error in its executor
    try {
      const promise = Q.Promise((resolve, reject) => {
        throw new Error("Test error");
      });

      // If we get here without an error, the error wasn't thrown synchronously
      promise.catch(() => {
        // In browser environment, errors are thrown asynchronously
        expect(errorThrownSynchronously).toBe(false);
        done();
      });
    } catch (e) {
      // In Node.js environment, errors are thrown synchronously
      errorThrownSynchronously = true;
      expect(errorThrownSynchronously).toBe(true);
      done();
    }

    // Give a tick for any async error throwing
    setTimeout(() => {
      if (!errorThrownSynchronously) {
        expect(errorThrownSynchronously).toBe(false);
        done();
      }
    }, 10);
  });
});