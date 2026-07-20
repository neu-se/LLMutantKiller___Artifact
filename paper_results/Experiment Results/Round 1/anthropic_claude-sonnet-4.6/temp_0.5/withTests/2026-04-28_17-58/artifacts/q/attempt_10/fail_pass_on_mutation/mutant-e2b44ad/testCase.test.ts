const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
const domain = require("domain");

describe("Promise.prototype.done", () => {
  it("errors from done() inside a domain should be caught by that domain's error handler", (done) => {
    const d = domain.create();
    const testError = new Error("test-domain-error");
    let caught = false;

    d.on("error", (err: any) => {
      if (err === testError) {
        caught = true;
        expect(caught).toBe(true);
        done();
      }
    });

    setTimeout(() => {
      if (!caught) {
        done(new Error("Expected domain to catch the error but it did not"));
      }
    }, 500);

    d.run(() => {
      const deferred = Q.defer();
      deferred.reject(testError);
      deferred.promise.done();
    });
  });
});