import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of progress listeners", () => {
    var deferred = Q.defer();
    var progressListeners: any[] = [];

    var promise = Q.when(
      deferred.promise,
      function () {
        expect(progressListeners.length).toBe(1);
      },
      function () {
        expect(true).toBe(false);
      },
      function () {
        progressListeners.push(1);
      }
    );

    deferred.notify();
    deferred.resolve();

    return promise;
  });
});