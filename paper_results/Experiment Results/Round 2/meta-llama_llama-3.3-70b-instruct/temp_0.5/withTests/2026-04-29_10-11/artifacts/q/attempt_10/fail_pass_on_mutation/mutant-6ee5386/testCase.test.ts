import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", () => {
    var deferred = Q.defer();
    Q.when(deferred.promise, function () {
      throw new Error("test");
    }, function (error) {
      expect(error.message).toBe("test");
    });
    deferred.resolve(10);
    return Q.delay(10);
  });
});