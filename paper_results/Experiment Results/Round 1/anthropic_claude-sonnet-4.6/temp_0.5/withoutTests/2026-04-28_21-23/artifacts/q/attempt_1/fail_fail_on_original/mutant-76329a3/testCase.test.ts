import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
  it("should return a bound function that dispatches apply with the correct arguments", async () => {
    const add = (a: number, b: number) => a + b;
    const boundAdd = Q.fbind(add, 1, 2);
    const result = await boundAdd(3);
    expect(result).toBe(6);
  });
});