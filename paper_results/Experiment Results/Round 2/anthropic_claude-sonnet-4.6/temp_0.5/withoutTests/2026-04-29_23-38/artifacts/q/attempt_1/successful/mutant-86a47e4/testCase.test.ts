import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress notification via deferred", () => {
  it("should deliver progress notifications to listeners registered before resolution", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise.then(
      null,
      null,
      function (value: number) {
        progressValues.push(value);
      }
    );

    deferred.notify(1);
    deferred.notify(2);
    deferred.notify(3);

    deferred.resolve("done");

    deferred.promise.then(function () {
      expect(progressValues).toEqual([1, 2, 3]);
      done();
    });
  });
});