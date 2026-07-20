import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
  it("should return a function that when called returns a promise resolving to the function result", async () => {
    const multiply = (a: number, b: number) => a * b;
    const boundMultiply = Q.fbind(multiply, 3, 4);
    const result = await boundMultiply();
    expect(result).toBe(12);
  });
});