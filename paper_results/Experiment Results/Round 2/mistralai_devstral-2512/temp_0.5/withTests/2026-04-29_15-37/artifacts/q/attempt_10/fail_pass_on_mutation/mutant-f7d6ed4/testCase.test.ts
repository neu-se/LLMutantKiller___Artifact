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
      let boundFunctionName = null;

      process.domain.bind = function(fn) {
        bindCallCount++;
        boundFunctionName = fn ? fn.name : null;
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
          // Original code: bindCallCount=1, boundFunctionName="onUnhandledError"
          // Mutated code: either bindCallCount=0 or boundFunctionName=null
          testPassed = (bindCallCount === 1 && boundFunctionName === "onUnhandledError");
          expect(testPassed).toBe(true);
          done();
        }, 50);
      });
    });
  });
});