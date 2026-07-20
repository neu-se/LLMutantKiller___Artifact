import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should not notify progress listener after throwing an error', () => {
    var deferred = Q.defer();
    var notified = false;

    var promise = Q.when(
      deferred.promise,
      function () {
        expect(notified).toBe(false);
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        notified = true;
        throw new Error('test');
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise.catch(function () {
      expect(notified).toBe(true);
    });
  });
});