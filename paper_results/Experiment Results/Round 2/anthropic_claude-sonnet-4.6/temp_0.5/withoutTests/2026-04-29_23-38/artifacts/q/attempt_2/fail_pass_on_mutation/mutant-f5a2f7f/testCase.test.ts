import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("resolves basic promise", async () => {
    const val = await Q(42);
    expect(val).toBe(42);
  });
});