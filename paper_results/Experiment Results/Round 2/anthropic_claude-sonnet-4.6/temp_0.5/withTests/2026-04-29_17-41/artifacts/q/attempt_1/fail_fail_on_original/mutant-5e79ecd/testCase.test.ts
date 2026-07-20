import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done with no callbacks on fulfilled promise", () => {
  it("should not call onUnhandledError when done() is called with no arguments on a fulfilled promise", (done) => {
    let errorCalled = false;
    Q.onerror = function () {
      errorCalled = true;
    };

    // With original code: promise = this (the fulfilled promise itself)
    // With mutated code: promise = this.then() (a new promise, also fulfilled)
    // Both should behave the same for fulfilled... 
    // But the key: with no callbacks, original skips the then() call entirely
    // Test: done() with no callbacks on a rejected promise should trigger onerror
    // The difference is that with mutation, even no-callback done() goes through then()
    // which means the rejection gets "handled" by then() before reaching onerror
    
    const deferred = Q.defer();
    deferred.promise.done();
    deferred.reject("test-error");

    Q.onerror = function (error: any) {
      expect(error).toBe("test-error");
      done();
    };

    setTimeout(() => {
      if (!errorCalled) {
        // Should have been called
        done(new Error("onerror was not called"));
      }
    }, 200);
  });
});