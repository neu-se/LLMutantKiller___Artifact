import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback sparse array handling", () => {
  it("should correctly handle Q.all with fulfilled promises", async () => {
    const result = await Q.all([Q(1), Q(2), Q(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});