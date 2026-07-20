import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", () => {
    var deferred = Q.defer();
    var threw = false;
    Q.when(deferred.promise, function () {
      threw = true;
      throw new Error("test");
    });
    var promise = Q.when(deferred.promise, function (value) {
      expect(value).toEqual(10);
    }, function () {
      expect("not").toEqual("here");
    });
    deferred.resolve(10);
    return promise;
  });
});