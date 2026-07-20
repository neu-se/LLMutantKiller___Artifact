import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain binding mutation detection", () => {
  it("should detect incorrect domain binding condition", (done) => {
    // Skip test if not in Node.js environment with domain support
    if (typeof process === "undefined" || !process.domain) {
      done();
      return;
    }

    const domain = process.domain.create();
    let testPassed = false;

    domain.run(() => {
      const deferred = Q.defer();
      const error = new Error("Test error");

      // Track the exact binding behavior
      const originalBind = process.domain.bind;
      let bindCallCount = 0;
      let correctFunctionBound = false;

      process.domain.bind = function(fn) {
        bindCallCount++;
        // The original code binds onUnhandledError function
        // The mutated code will either not bind or bind wrong function
        if (fn && fn.toString().includes("onUnhandledError")) {
          correctFunctionBound = true;
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
          // Original code: bindCallCount=1, correctFunctionBound=true
          // Mutated code: either bindCallCount=0 or correctFunctionBound=false
          testPassed = (bindCallCount === 1 && correctFunctionBound);
          expect(testPassed).toBe(true);
          done();
        }, 50);
      });
    });
  });
});