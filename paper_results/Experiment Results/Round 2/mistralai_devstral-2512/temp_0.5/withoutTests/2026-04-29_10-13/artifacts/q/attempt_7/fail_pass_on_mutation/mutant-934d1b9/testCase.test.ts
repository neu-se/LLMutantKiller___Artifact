const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q defer resolution", () => {
  it("should prevent multiple resolutions when resolvedPromise check is working", (done) => {
    const deferred = Q.defer();
    const results: string[] = [];

    deferred.promise.then((value: string) => {
      results.push(value);
    });

    // First resolution should work
    deferred.resolve("first");

    // Second resolution should be ignored due to resolvedPromise check
    deferred.resolve("second");

    setTimeout(() => {
      expect(results).toEqual(["first"]);
      done();
    }, 10);
  });
});