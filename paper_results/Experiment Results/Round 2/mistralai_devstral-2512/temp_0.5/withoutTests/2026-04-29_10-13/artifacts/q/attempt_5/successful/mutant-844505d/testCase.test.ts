const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done with domain", () => {
  it("should bind error handler to domain when process.domain exists", (done) => {
    // Create a domain to test the binding behavior
    const domain = require('domain').create();

    // Track if the error handler was bound to the domain
    let bindCalled = false;
    const originalBind = domain.bind;
    domain.bind = function(fn) {
      bindCalled = true;
      return originalBind.call(this, fn);
    };

    domain.run(() => {
      const promise = Q.reject(new Error("Test error"));
      promise.done(
        () => {
          done(new Error("Promise should have been rejected"));
        },
        (error: Error) => {
          // In the original code, the error handler should be bound to the domain
          // In the mutated code (if (false)), it won't be bound
          expect(bindCalled).toBe(true);
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe("Test error");
          done();
        }
      );
    });
  });
});