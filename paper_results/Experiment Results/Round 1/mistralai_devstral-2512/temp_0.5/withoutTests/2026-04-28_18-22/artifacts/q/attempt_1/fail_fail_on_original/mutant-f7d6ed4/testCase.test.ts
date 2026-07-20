import { Q } from "./q.js";

describe("Q.done() with process.domain", () => {
  it("should handle unhandled errors correctly when process.domain exists", (done) => {
    // Create a mock process.domain object
    const originalProcess = global.process;
    global.process = {
      domain: {
        bind: (fn: Function) => fn
      }
    } as any;

    // Create a promise that rejects
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Use done() which should bind the error handler to process.domain
    rejectedPromise.done(
      () => {},
      (error: Error) => {
        // This should be called with the error
        expect(error.message).toBe("Test error");
        // Restore original process
        global.process = originalProcess;
        done();
      }
    );
  });
});