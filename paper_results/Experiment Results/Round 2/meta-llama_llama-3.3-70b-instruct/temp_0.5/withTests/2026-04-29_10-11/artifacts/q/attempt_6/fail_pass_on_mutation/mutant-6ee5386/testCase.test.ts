import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", () => {
    var deferred = Q.defer();
    var observersCalled = 0;
    Q.when(deferred.promise, function () {
      observersCalled++;
      throw new Error("test");
    });
    Q.when(deferred.promise, function () {
      observersCalled++;
    }, function () {
      expect(observersCalled).toBe(2);
    });
    deferred.resolve(10);
    return Q.delay(10).then(function () {
      expect(observersCalled).toBe(2);
    });
  });
});