import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fapply", () => {
  it("should pass args to the function when using fapply", async () => {
    const fn = function (a: number, b: number) {
      return a + b;
    };

    const result = await Q.fapply(fn, [3, 4]);
    expect(result).toBe(7);
  });
});