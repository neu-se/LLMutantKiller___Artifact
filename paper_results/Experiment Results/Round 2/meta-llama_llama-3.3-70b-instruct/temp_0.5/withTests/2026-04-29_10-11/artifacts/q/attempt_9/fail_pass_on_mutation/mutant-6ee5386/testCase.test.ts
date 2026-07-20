import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", () => {
    var deferred = Q.defer();
    var called = false;
    Q.when(deferred.promise, function () {
      called = true;
      throw new Error("test");
    }, function () {
      expect(called).toBe(true);
    });
    deferred.resolve(10);
    return Q.delay(10).then(function () {
      expect(called).toBe(true);
    });
  });
});