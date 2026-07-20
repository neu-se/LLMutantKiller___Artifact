import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve with the first fulfilled promise value", async () => {
    const result = await Q.any([
      Q.reject(new Error("first rejection")),
      Q.resolve(42),
      Q.reject(new Error("third rejection")),
    ]);
    expect(result).toBe(42);
  });
});