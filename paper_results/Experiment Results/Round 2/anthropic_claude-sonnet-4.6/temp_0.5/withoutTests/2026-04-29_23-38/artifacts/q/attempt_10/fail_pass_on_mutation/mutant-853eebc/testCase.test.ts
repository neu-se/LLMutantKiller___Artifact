import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior", () => {
  it("should resolve with the first fulfilled promise value", async () => {
    const result = await Q.any([
      Q.reject(new Error("first")),
      Q.resolve(42),
      Q.resolve(100)
    ]);
    expect(result).toBe(42);
  });
});