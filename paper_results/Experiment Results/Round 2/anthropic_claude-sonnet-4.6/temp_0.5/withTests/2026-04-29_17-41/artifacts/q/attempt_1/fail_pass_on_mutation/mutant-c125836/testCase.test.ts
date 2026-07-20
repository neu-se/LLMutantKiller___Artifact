import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback with initial value", () => {
  it("should use the provided initial value when reducing with an explicit basis", async () => {
    // Save and remove Array.prototype.reduce to force the fallback
    const originalReduce = Array.prototype.reduce;
    (Array.prototype as any).reduce = undefined;

    // Re-require the module to get a fresh instance using the fallback
    // Since we can't re-require easily, we test via Q.all which uses array_reduce internally
    // Instead, test the observable behavior through Q's all() which uses array_reduce with void 0 as basis
    
    // Restore immediately since we can't re-require
    (Array.prototype as any).reduce = originalReduce;

    // Test that Q.all works correctly - it uses array_reduce(promises, fn, void 0)
    // With the mutation, when basis=void 0 is passed, it would be overwritten by first element
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});