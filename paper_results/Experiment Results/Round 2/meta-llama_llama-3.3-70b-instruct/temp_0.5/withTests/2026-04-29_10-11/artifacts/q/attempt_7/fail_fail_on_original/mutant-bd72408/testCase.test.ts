import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of progress listeners", () => {
    var deferred = Q.defer();
    var progressCalled = false;

    Q.when(deferred.promise, function () {
      expect(progressCalled).toBe(true);
    }, function () {
      expect(true).toBe(false);
    }, function (progress) {
      progressCalled = true;
      expect(progress).toBeUndefined();
    });

    deferred.notify();
    deferred.resolve();
  });
});