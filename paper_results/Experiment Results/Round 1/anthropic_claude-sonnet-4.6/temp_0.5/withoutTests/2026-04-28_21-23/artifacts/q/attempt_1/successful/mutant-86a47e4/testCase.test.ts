import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress notification", () => {
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

    Q.nextTick(function () {
      Q.nextTick(function () {
        Q.nextTick(function () {
          try {
            expect(progressValues.length).toBeGreaterThan(0);
            expect(progressValues).toContain(1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});