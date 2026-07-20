const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling in browsers", () => {
  it("should re-throw uncaught exceptions asynchronously in browser environments", (done) => {
    // Track if error was re-thrown
    let errorCaught = false;

    // Override global error handler to detect re-thrown errors
    const originalOnerror = (global as any).onerror;
    (global as any).onerror = function(message: string, source: string, lineno: number, colno: number, error: Error) {
      errorCaught = true;
      (global as any).onerror = originalOnerror;
      done();
      return true;
    };

    // Create a rejected promise without handling it
    // This should trigger the async error re-throwing in browser environments
    Q.reject(new Error("Test error"));

    // Give time for async error handling
    setTimeout(() => {
      (global as any).onerror = originalOnerror;
      if (!errorCaught) {
        done(new Error("Expected error to be re-thrown to global error handler"));
      }
    }, 50);
  });
});