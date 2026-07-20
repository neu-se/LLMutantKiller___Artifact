import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should properly handle thenResolve after rejection catch", async () => {
    const result = await Q.reject(new Error("err"))
      .catch(() => 42)
      .thenResolve(100);
    expect(result).toBe(100);
  });
});