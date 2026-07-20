import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised", () => {
  it("should pass both this context and arguments to the callback", async () => {
    const add = Q.promised(function (a: number, b: number) {
      return a + b;
    });

    const result = await add(Q(3), Q(4));
    expect(result).toBe(7);
  });
});