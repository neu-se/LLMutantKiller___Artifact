import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loads and basic functionality works", () => {
  it("should be able to create and resolve a basic promise", async () => {
    expect(typeof Q).toBe("function");
    const val = await Q(5);
    expect(val).toBe(5);
  });
});