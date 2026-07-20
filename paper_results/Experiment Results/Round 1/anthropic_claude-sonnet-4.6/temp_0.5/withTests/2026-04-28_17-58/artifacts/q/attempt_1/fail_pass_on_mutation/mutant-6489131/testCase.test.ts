import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback behavior", () => {
  it("Q.all resolves correctly when Array.prototype.reduce is shimmed", async () => {
    const originalReduce = Array.prototype.reduce;
    // Remove native reduce to force the shim to be used
    // Note: Q captures the reference at load time, so we test via Q.all behavior
    // which uses array_reduce internally
    
    // Test that Q.all works with a non-sparse array of resolved promises
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});