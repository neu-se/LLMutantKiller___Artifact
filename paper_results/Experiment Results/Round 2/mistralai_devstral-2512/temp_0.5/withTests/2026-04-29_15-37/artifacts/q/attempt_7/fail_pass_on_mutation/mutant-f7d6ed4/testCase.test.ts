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

      // Track domain binding behavior
      const originalBind = process.domain.bind;
      let bindCalled = false;
      let bindCalledWithCorrectFunction = false;

      process.domain.bind = function(fn) {
        bindCalled = true;
        // The original code should bind the onUnhandledError function
        // The mutated code will either not call bind or call it with wrong function
        if (fn && fn.name === "onUnhandledError") {
          bindCalledWithCorrectFunction = true;
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
          // because either bind won't be called or called with wrong function
          expect(bindCalled).toBe(true);
          expect(bindCalledWithCorrectFunction).toBe(true);
          done();
        }, 50);
      });
    });
  });
});