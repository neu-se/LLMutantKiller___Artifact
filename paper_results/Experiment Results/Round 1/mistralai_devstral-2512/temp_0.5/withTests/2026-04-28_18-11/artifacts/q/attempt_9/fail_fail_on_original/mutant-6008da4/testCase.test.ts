import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should handle uncaught promise errors appropriately for environment", (done) => {
    // This test verifies that Q handles uncaught errors correctly based on environment
    // The mutation changes isNodeJS from false to true, which affects error handling

    const error = new Error("test error");
    let errorCaught = false;

    // Create a promise that will throw an uncaught error
    const promise = Q.reject(error);

    // In Node.js, uncaught errors are thrown synchronously
    // In browser, they're handled asynchronously
    try {
      promise.done();
    } catch (e) {
      // If we catch here, it's Node.js behavior (isNodeJS=true)
      errorCaught = true;
    }

    // Set up async error handler
    setTimeout(() => {
      // In original code (isNodeJS=false), error should not be caught synchronously
      // In mutated code (isNodeJS=true), error would be caught synchronously
      expect(errorCaught).toBe(false);
      done();
    }, 10);
  });
});