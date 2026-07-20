import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised", () => {
  it("should resolve promised arguments and call the function with their values", async () => {
    const add = Q.promised(function(a: number, b: number) {
      return a + b;
    });

    const result = await add(Q.resolve(3), Q.resolve(4));
    expect(result).toBe(7);
  });
});