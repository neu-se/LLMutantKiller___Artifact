import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should correctly handle errors in non-NodeJS environment", (done) => {
    // This test verifies that Q correctly handles errors when not in a NodeJS environment
    // The mutation changes isNodeJS from false to true, which would change error handling behavior

    const deferred = Q.defer();
    const error = new Error("test error");

    // Track if error was handled in Node.js style (synchronous rethrow)
    let errorHandledSynchronously = false;

    try {
      deferred.promise.then(() => {
        throw error;
      }, (e) => {
        // In Node.js, uncaught exceptions in promises are synchronous
        // In browser/mutated code, they're asynchronous
        errorHandledSynchronously = true;
        expect(e).toBe(error);
        done();
      });

      deferred.resolve("test");
    } catch (e) {
      // If we get here, the error was thrown synchronously (Node.js behavior)
      errorHandledSynchronously = false;
    }

    // In original code (isNodeJS=false), errors should be handled asynchronously
    // In mutated code (isNodeJS=true), errors would be handled synchronously
    // Since we're running in Jest (Node.js), we need to verify the async behavior
    setTimeout(() => {
      expect(errorHandledSynchronously).toBe(true);
      done();
    }, 10);
  });
});