import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with sparse array handling", () => {
  it("resolves a sparse array where array_reduce processes elements correctly", async () => {
    // Force usage of the internal array_reduce by temporarily removing Array.prototype.reduce
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    try {
      // Now Q's internal array_reduce fallback will be used
      // The mutation breaks basis initialization when no initial value is provided
      // In the fallback, when called without initial value, it should find first element
      // The mutated code has empty if block so basis never gets set from first element
      const promise = Q.all([Q.resolve(10), Q.resolve(20), Q.resolve(30)]);
      const results = await promise;
      expect(results).toEqual([10, 20, 30]);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});