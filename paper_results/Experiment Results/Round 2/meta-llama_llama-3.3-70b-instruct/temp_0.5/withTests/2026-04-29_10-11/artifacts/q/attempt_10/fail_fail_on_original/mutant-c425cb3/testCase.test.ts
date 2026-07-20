import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should call progress listener before throwing an error', () => {
    var deferred = Q.defer();
    var progressCalled = false;

    var promise = Q.when(
      deferred.promise,
      function () {
        expect(true).toBe(false);
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        progressCalled = true;
        throw new Error('test');
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise.catch(function () {
      expect(progressCalled).toBe(true);
    });
  });
});