const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution", () => {
  it("should resolve a deferred promise and execute callbacks", (done) => {
    const deferred = Q.defer();
    let callbackExecuted = false;

    deferred.promise.then(() => {
      callbackExecuted = true;
    });

    deferred.resolve("test");

    setTimeout(() => {
      expect(callbackExecuted).toBe(true);
      done();
    }, 10);
  });
});