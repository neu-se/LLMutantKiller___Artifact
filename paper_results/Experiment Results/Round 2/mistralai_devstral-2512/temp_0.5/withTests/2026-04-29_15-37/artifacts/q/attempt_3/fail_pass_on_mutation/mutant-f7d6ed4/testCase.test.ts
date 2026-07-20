import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() domain binding mutation detection", () => {
  it("should fail when process.domain binding is incorrect", (done) => {
    // Skip test if not in Node.js environment with domain support
    if (typeof process === "undefined" || !process.domain) {
      done();
      return;
    }

    const domain = process.domain.create();
    let errorCaught = false;
    let bindingCorrect = false;

    domain.run(() => {
      const deferred = Q.defer();
      const error = new Error("Test error");

      // Track if onUnhandledError was properly bound to domain
      const originalBind = process.domain.bind;
      let bindCalled = false;

      process.domain.bind = function(fn) {
        bindCalled = true;
        bindingCorrect = (fn === onUnhandledError);
        return originalBind.call(this, fn);
      };

      Q.onerror = function(err) {
        errorCaught = true;
        expect(err).toBe(error);
      };

      const onUnhandledError = function(err) {
        Q.nextTick(function() {
          Q.onerror(err);
        });
      };

      deferred.promise.done();

      Q.nextTick(() => {
        deferred.reject(error);

        setTimeout(() => {
          expect(errorCaught).toBe(true);
          expect(bindCalled).toBe(true);
          expect(bindingCorrect).toBe(true);
          done();
        }, 50);
      });
    });
  });
});