import { Q } from "./q.js";

describe("Q.done unhandled error handling", () => {
  it("should call Q.onerror when an unhandled error occurs in done", (done) => {
    // Set up a custom error handler
    const originalOnerror = Q.onerror;
    let errorHandlerCalled = false;
    Q.onerror = (error) => {
      errorHandlerCalled = true;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");
    };

    // Create a rejected promise and call done without handlers
    const rejectedPromise = Q.reject(new Error("Test error"));
    rejectedPromise.done();

    // Give the nextTick a chance to execute
    setTimeout(() => {
      expect(errorHandlerCalled).toBe(true);
      Q.onerror = originalOnerror;
      done();
    }, 10);
  });
});