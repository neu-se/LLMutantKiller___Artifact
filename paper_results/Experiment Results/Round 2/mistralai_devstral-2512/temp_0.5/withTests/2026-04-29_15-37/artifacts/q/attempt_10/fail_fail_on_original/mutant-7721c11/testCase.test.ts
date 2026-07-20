import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly find promise indices in allSettled", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // allSettled internally uses array_indexOf to track promise positions
    // The mutation changes the condition from `this[i] === value` to `if (false)`
    // which would cause indexOf to always return -1
    return Q.allSettled(promises).then((results: any[]) => {
      // In original code, results should maintain the same order as promises
      // In mutated code, the order might be wrong due to broken indexOf
      expect(results[0].state).toBe("pending");
      expect(results[1].state).toBe("pending");

      // Now resolve them in order and check the results
      deferred1.resolve("first");
      deferred2.resolve("second");

      return Q.delay(10).then(() => {
        return Q.allSettled(promises).then((finalResults: any[]) => {
          expect(finalResults[0].value).toBe("first");
          expect(finalResults[1].value).toBe("second");
        });
      });
    });
  });
});