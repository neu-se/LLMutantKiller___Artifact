import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", () => {
    var deferred = Q.defer();
    var threw = false;
    Q.when(deferred.promise, function () {
      threw = true;
      throw new Error("test");
    }, function () {
      expect(threw).toBe(true);
    }, function () {
      expect(threw).toBe(false);
    });
    deferred.resolve(10);
    return Q.delay(10).then(function () {
      expect(threw).toBe(true);
    });
  });
});