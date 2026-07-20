const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("progress listener registration", () => {
  it("should register progress listeners when 'when' operation is called with a progress callback", () => {
    const deferred = Q.defer();
    let progressCalled = false;

    const promise = Q.when(
      deferred.promise,
      () => {},
      () => {},
      () => {
        progressCalled = true;
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise.then(() => {
      expect(progressCalled).toBe(true);
    });
  });
});