import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should call progress listener when progress is notified and then is called', () => {
    var deferred = Q.defer();
    var progressCalled = false;
    var thenCalled = false;

    var promise = Q.when(
      deferred.promise,
      function () {
        thenCalled = true;
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        progressCalled = true;
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise.then(function () {
      expect(progressCalled).toBe(true);
      expect(thenCalled).toBe(true);
    });
  });
});