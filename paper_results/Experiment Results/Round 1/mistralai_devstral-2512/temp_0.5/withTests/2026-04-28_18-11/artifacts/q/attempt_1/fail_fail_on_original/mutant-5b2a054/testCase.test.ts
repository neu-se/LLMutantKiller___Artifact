import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in browser environment", () => {
  it("should re-throw uncaught exceptions asynchronously in browsers", (done) => {
    // This test verifies that uncaught exceptions in promise handlers
    // are re-thrown asynchronously in browser environments
    const originalError = new Error("Test error");

    // Create a promise that will throw an error
    const promise = Q.reject(originalError).then(() => {
      throw new Error("This should not be caught");
    });

    // Set up error handler
    let errorCaught = false;
    const originalOnerror = (window as any).onerror;
    (window as any).onerror = function(message: string, source: string, lineno: number, colno: number, error: Error) {
      if (error === originalError) {
        errorCaught = true;
        (window as any).onerror = originalOnerror;
        done();
      }
      return true;
    };

    // Give time for the async re-throw to happen
    setTimeout(() => {
      if (!errorCaught) {
        (window as any).onerror = originalOnerror;
        done(new Error("Expected error was not thrown asynchronously"));
      }
    }, 100);
  });
});