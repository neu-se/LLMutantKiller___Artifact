import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic", () => {
  it("resolves", async () => {
    expect(await Q(42)).toBe(42);
  });
});