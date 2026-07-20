import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("Q.when resolves fulfilled promises correctly", async () => {
    const result = await Q.when(Q.resolve(42));
    expect(result).toBe(42);
  });
});