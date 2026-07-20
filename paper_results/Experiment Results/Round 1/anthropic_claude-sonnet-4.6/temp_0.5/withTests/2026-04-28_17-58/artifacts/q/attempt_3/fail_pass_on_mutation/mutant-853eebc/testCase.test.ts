import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map fallback behavior", () => {
  it("should correctly map values when using Q.promised with array arguments", async () => {
    const add = Q.promised(function(a: number, b: number) {
      return a + b;
    });

    const result = await add(Q(3), Q(4));
    expect(result).toBe(7);
  });
});