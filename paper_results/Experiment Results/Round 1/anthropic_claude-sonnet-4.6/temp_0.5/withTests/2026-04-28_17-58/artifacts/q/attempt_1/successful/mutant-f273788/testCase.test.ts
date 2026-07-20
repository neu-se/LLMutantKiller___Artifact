import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fapply", () => {
  it("should pass arguments to the function when using fapply", async () => {
    const result = await Q.fapply(function (a: number, b: number, c: number) {
      return a + b + c;
    }, [1, 2, 3]);

    expect(result).toEqual(6);
  });
});