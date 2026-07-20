import { Q } from "./q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly untrack handled rejections", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Listen for unhandledRejection event
    let unhandledRejectionCalled = false;
    const unhandledListener = (reason: any, promise: any) => {
      unhandledRejectionCalled = true;
    };

    // Listen for rejectionHandled event
    let rejectionHandledCalled = false;
    const handledListener = (reason: any, promise: any) => {
      rejectionHandledCalled = true;
    };

    // Setup event listeners if process.emit is available
    if (typeof process === "object" && typeof process.emit === "function") {
      process.on("unhandledRejection", unhandledListener);
      process.on("rejectionHandled", handledListener);
    }

    // Wait for the unhandled rejection to be tracked
    setTimeout(() => {
      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Wait for the rejectionHandled event to be emitted
        setTimeout(() => {
          // Clean up listeners
          if (typeof process === "object" && typeof process.removeListener === "function") {
            process.removeListener("unhandledRejection", unhandledListener);
            process.removeListener("rejectionHandled", handledListener);
          }

          // Verify that both events were called
          expect(unhandledRejectionCalled).toBe(true);
          expect(rejectionHandledCalled).toBe(true);
          done();
        }, 50);
      });
    }, 50);
  });
});