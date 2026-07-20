import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred.notify should not call progress listeners after resolution", () => {
  it("does not call the progress listener if notify is called after fulfillment", (done) => {
    const deferred = Q.defer();
    let called = false;

    Q.when(deferred.promise, null, null, function () {
      called = true;
    });

    deferred.resolve();
    deferred.notify();

    // Wait a bit to ensure any async callbacks have fired
    setTimeout(function () {
      expect(called).toBe(false);
      done();
    }, 50);
  });
});