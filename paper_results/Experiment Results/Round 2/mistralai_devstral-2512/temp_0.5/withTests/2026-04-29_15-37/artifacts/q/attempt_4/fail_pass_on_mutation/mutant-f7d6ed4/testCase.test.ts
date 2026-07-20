import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain binding mutation detection", () => {
  it("should detect incorrect domain binding logic", (done) => {
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

      // Track domain binding behavior
      const originalBind = process.domain.bind;
      let bindCalledWithCorrectFunction = false;
      let bindCalledAtAll = false;

      process.domain.bind = function(fn) {
        bindCalledAtAll = true;
        if (fn.toString().includes("onUnhandledError")) {
          bindCalledWithCorrectFunction = true;
        }
        return originalBind.call(this, fn);
      };

      // Set up error handler
      Q.onerror = function(err) {
        if (err === error) {
          testPassed = bindCalledWithCorrectFunction;
        }
      };

      // Create promise and call done()
      deferred.promise.done();

      // Trigger rejection
      Q.nextTick(() => {
        deferred.reject(error);

        setTimeout(() => {
          expect(testPassed).toBe(true);
          expect(bindCalledAtAll).toBe(true);
          done();
        }, 50);
      });
    });
  });
});