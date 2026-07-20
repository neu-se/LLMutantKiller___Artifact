import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
  it("should return a function that returns a promise when called", async () => {
    const fn = (a: number) => a * 2;
    const boundFn = Q.fbind(fn);
    const result = boundFn(5);
    expect(result).toBeDefined();
    const value = await result;
    expect(value).toBe(10);
  });
});