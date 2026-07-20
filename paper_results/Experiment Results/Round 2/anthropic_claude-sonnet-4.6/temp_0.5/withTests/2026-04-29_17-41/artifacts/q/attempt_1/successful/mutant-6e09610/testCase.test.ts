import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("thenResolve", () => {
  it("should resolve with the specified value, not undefined", async () => {
    const result = await Q.resolve("ignored").thenResolve("expected");
    expect(result).toBe("expected");
  });
});