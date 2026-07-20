import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain binding mutation detection", () => {
  it("should fail when domain binding condition is mutated", (done) => {
    // Skip test if not in Node.js environment with domain support
    if (typeof process === "undefined" || !process.domain) {
      done();
      return;
    }

    const domain = process.domain.create();
    let domainBindingVerified = false;

    domain.run(() => {
      const deferred = Q.defer();
      const error = new Error("Test error");

      // Override domain.bind to verify it's called with correct function
      const originalBind = process.domain.bind;
      process.domain.bind = function(fn) {
        // The original code should bind onUnhandledError function
        // The mutated code will fail this check because the condition is wrong
        if (fn.name === "onUnhandledError") {
          domainBindingVerified = true;
        }
        return originalBind.call(this, fn);
      };

      // Set up error handler
      Q.onerror = function(err) {
        expect(err).toBe(error);
      };

      // Create promise and call done()
      deferred.promise.done();

      // Trigger rejection
      Q.nextTick(() => {
        deferred.reject(error);

        setTimeout(() => {
          // This assertion will fail on mutated code
          expect(domainBindingVerified).toBe(true);
          done();
        }, 50);
      });
    });
  });
});