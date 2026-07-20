import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should call progress listener even if later rejected', () => {
    var deferred = Q.defer();
    var progressed = false;
    var promise = Q.when(
      deferred.promise,
      function () {
        expect(true).toBe(false);
      },
      function () {
        expect(progressed).toBe(true);
      },
      function () {
        progressed = true;
      }
    );

    deferred.notify();
    deferred.reject();

    return promise;
  });
});