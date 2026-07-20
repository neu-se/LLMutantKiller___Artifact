const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution", () => {
  it("should allow multiple resolutions after the first one is processed", (done) => {
    const deferred = Q.defer();
    let firstValue: string | null = null;
    let secondValue: string | null = null;

    deferred.promise.then((value: string) => {
      firstValue = value;
      // Try to resolve again after first resolution
      deferred.resolve("second value");

      setTimeout(() => {
        expect(firstValue).toBe("first value");
        expect(secondValue).toBeNull();
        done();
      }, 10);
    });

    deferred.resolve("first value");
  });
});