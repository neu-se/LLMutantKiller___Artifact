import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain binding", () => {
  it("should properly bind onUnhandledError when process.domain exists", (done) => {
    // Skip test if not in Node.js environment with domain support
    if (typeof process === "undefined" || !process.domain) {
      done();
      return;
    }

    const domain = process.domain.create();
    let errorCaught = false;
    let domainContextVerified = false;

    domain.run(() => {
      // Create a promise that will be rejected
      const deferred = Q.defer();
      const error = new Error("Test error");

      // Set up error handler
      Q.onerror = function(err) {
        // Verify we're in the correct domain context
        domainContextVerified = (process.domain === domain);
        errorCaught = true;
        expect(err).toBe(error);
      };

      // Call done() without handlers to trigger unhandled rejection
      deferred.promise.done();

      // Reject the promise in next tick to ensure async handling
      Q.nextTick(() => {
        deferred.reject(error);

        // Verify the error was caught with proper domain binding
        setTimeout(() => {
          expect(errorCaught).toBe(true);
          expect(domainContextVerified).toBe(true);
          done();
        }, 50);
      });
    });
  });
});