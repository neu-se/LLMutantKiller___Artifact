import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of progress listeners", () => {
    var deferred = Q.defer();
    var progressValues = [];

    var promise = Q.when(
      deferred.promise,
      function () {
        expect(progressValues).toEqual([1, 2]);
      },
      function () {
        expect(true).toBe(false);
      },
      function (progressValue) {
        progressValues.push(progressValue);
      }
    );

    deferred.notify(1);
    deferred.notify(2);
    deferred.resolve();

    return promise;
  });
});