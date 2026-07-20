import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
  it('should notify with progress value', () => {
    var deferred = Q.defer();
    var progressValue;
    var promise = deferred.promise.then(
      function () {
        expect(progressValue).toBe('test');
      },
      function () {
        expect(true).toBe(false);
      },
      function (value) {
        progressValue = value;
      }
    );

    deferred.notify('test');
    deferred.resolve();

    return promise;
  });
});