const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q defer resolution state", () => {
  it("should detect when resolvedPromise check is bypassed", (done) => {
    const deferred = Q.defer();
    const results: string[] = [];

    deferred.promise.then((value: string) => {
      results.push(value);
    });

    // First resolution
    deferred.resolve("first");

    // These should be ignored in original code but might execute in mutated code
    deferred.resolve("second");
    deferred.resolve("third");

    setTimeout(() => {
      // In original code, only first resolution should execute
      // In mutated code (if resolvedPromise check is broken), all might execute
      expect(results.length).toBe(1);
      expect(results[0]).toBe("first");
      done();
    }, 10);
  });
});