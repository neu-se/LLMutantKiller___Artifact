import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce shim behavior via Q.all", () => {
  it("should correctly reduce with an explicit initial basis value, not treating the first array element as basis", async () => {
    // The mutation changes `if (arguments.length === 1)` to `if (true)` in the
    // array_reduce fallback shim. When an explicit basis (void 0) is passed,
    // the original code skips seeking the first element as basis.
    // With the mutation, it always seeks the first element as basis, ignoring
    // the provided initial value.
    //
    // We test this by temporarily replacing Array.prototype.reduce to force
    // the shim to be used, then verifying Q.all works correctly.
    
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    try {
      const result = await Q.all([Q(1), Q(2), Q(3)]);
      expect(result).toEqual([1, 2, 3]);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});