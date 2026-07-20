import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should not notify if error is thrown in progress listener', () => {
    var deferred = Q.defer();
    var progressed = false;
    var threw = false;
    var promise = Q.when(
      deferred.promise,
      function () {
        expect(progressed).toBe(true);
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        progressed = true;
        throw new Error('test');
      }
    );

    Q.onerror = function () {
      threw = true;
    };

    deferred.notify();
    deferred.resolve();

    return promise.then(function () {
      expect(threw).toBe(true);
    });
  });
});