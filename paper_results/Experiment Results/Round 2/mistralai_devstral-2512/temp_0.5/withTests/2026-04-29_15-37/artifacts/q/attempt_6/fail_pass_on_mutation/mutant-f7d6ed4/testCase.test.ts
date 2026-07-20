import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain binding mutation detection", () => {
  it("should detect incorrect domain binding condition", (done) => {
    // Skip test if not in Node.js environment with domain support
    if (typeof process === "undefined" || !process.domain) {
      done();
      return;
    }

    const domain = process.domain.create();
    let bindingCheckPassed = false;

    domain.run(() => {
      const deferred = Q.defer();
      const error = new Error("Test error");

      // Track the exact function being bound
      const originalBind = process.domain.bind;
      let boundFunctionName = null;

      process.domain.bind = function(fn) {
        boundFunctionName = fn.name;
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
          // The original code binds "onUnhandledError"
          // The mutated code will bind nothing (undefined) due to wrong condition
          bindingCheckPassed = (boundFunctionName === "onUnhandledError");
          expect(bindingCheckPassed).toBe(true);
          done();
        }, 50);
      });
    });
  });
});