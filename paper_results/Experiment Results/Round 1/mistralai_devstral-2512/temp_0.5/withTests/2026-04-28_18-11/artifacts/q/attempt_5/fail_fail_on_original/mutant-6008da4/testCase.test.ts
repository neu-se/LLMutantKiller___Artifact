import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should correctly detect NodeJS environment for error handling", (done) => {
    // This test verifies that Q correctly identifies NodeJS environment
    // The mutation changes isNodeJS from false to true, which affects error handling

    // Create a promise that will throw an error
    const error = new Error("test error");
    let errorThrownSynchronously = false;

    // In Node.js, uncaught promise errors are thrown synchronously
    // In browser, they're thrown asynchronously
    try {
      Q.reject(error).done();
    } catch (e) {
      errorThrownSynchronously = true;
    }

    // Set up a handler for async errors
    Q.onerror = (e: any) => {
      // In original code (isNodeJS=false), errors should come through onerror
      // In mutated code (isNodeJS=true), they would be thrown synchronously
      expect(e).toBe(error);
      expect(errorThrownSynchronously).toBe(false);
      done();
    };

    // Give some time for async error handling
    setTimeout(() => {
      // If we get here without the onerror being called, the test fails
      expect(false).toBe("Error handler should have been called");
      done();
    }, 100);
  });
});