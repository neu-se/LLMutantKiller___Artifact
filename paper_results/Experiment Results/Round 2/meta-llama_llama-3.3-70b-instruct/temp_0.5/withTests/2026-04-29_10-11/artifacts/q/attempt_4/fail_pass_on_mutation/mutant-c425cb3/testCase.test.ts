import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should notify with progress value when no error is thrown', () => {
    var deferred = Q.defer();
    var notified = false;
    var promise = Q.when(
      deferred.promise,
      function () {
        expect(notified).toBe(true);
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        notified = true;
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise;
  });
});