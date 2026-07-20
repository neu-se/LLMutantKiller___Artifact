const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q defer resolution", () => {
  it("should properly handle deferred resolution state", (done) => {
    const deferred = Q.defer();
    let firstValue: unknown;
    let secondValue: unknown;

    deferred.promise.then((value: unknown) => {
      if (!firstValue) {
        firstValue = value;
      } else {
        secondValue = value;
      }
    });

    deferred.resolve("first value");
    deferred.resolve("second value");

    setTimeout(() => {
      expect(firstValue).toBe("first value");
      expect(secondValue).toBeUndefined();
      done();
    }, 10);
  });
});