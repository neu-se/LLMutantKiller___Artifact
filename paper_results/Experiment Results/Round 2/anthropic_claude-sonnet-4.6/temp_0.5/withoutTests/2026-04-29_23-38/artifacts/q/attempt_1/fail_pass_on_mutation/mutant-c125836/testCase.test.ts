import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback behavior via Q.all", () => {
  it("should resolve Q.all with an empty array to an empty array", async () => {
    // Q.all uses array_reduce internally with an initial value (void 0)
    // The mutation changes `if (arguments.length === 1)` to `if (true)` in the
    // array_reduce fallback. When called with an initial basis and an empty array,
    // the mutated fallback would throw TypeError instead of returning the basis.
    // This tests that Q.all([]) resolves correctly (uses array_reduce with basis).
    const result = await Q.all([]);
    expect(result).toEqual([]);
  });
});