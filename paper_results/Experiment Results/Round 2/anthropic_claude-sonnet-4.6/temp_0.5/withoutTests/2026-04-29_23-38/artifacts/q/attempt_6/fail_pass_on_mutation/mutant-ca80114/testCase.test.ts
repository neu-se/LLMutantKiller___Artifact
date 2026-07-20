import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle spread with fulfilled promises", async () => {
    const result = await Q.spread([Q(1), Q(2), Q(3)], function(a: number, b: number, c: number) {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});