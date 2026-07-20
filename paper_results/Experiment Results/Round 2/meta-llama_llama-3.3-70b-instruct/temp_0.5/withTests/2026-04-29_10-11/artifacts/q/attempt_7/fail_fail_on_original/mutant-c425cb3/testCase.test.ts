import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should not call progress listener after throwing an error', () => {
    var deferred = Q.defer();
    var progressCalled = 0;

    var promise = Q.when(
      deferred.promise,
      function () {
        expect(true).toBe(false);
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        progressCalled++;
        throw new Error('test');
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise.then(function () {
      expect(progressCalled).toBe(1);
    }, function () {
      expect(progressCalled).toBe(1);
    });
  });
});