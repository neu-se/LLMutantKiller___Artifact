import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post with null method name", () => {
  it("should invoke the function directly when method name is null", async () => {
    const fn = (a: number, b: number) => a + b;
    const result = await Q(fn).post(null, [3, 4]);
    expect(result).toBe(7);
  });
});