import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should call progress listener only once when throwing an error in the progress callback', () => {
    var deferred = Q.defer();
    var progressCalled = 0;

    var promise = Q.when(
      deferred.promise,
      function () {
        expect(progressCalled).toBe(1);
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

    return promise;
  });
});