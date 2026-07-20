// Test case to detect the mutation in the `done` method of Q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain handling", () => {
  it("should correctly bind onUnhandledError to process.domain when it exists", (done) => {
    // This test only runs in Node.js environments where process.domain exists
    if (typeof process === "object" && process && typeof process.domain === "function") {
      const domain = process.domain.create();
      let errorHandled = false;

      domain.run(() => {
        // Create a rejected promise that will trigger the unhandled error path
        const rejectedPromise = Q.reject(new Error("Test error"));

        // Set up a custom error handler
        Q.onerror = (error) => {
          errorHandled = true;
          expect(error.message).toBe("Test error");
          done();
        };

        // Call done() without handlers to trigger the unhandled rejection path
        rejectedPromise.done();

        // Give time for async operations
        setTimeout(() => {
          if (!errorHandled) {
            done(new Error("Error was not handled as expected"));
          }
        }, 100);
      });
    } else {
      // If process.domain doesn't exist, mark test as passed
      done();
    }
  });
});