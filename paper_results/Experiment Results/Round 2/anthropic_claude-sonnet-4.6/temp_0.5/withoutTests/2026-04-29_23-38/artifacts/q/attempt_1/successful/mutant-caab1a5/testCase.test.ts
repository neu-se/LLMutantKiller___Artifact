import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.when", () => {
  it("should resolve with the fulfilled value when called with a value and fulfilled callback", async () => {
    const result = await Q.when(42, (value: number) => value * 2);
    expect(result).toBe(84);
  });
});