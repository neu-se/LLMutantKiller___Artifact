import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("resolves with first fulfilled value when some promises reject", async () => {
    const result = await Q.any([
      Q.reject(new Error("first")),
      Q.resolve(42),
      Q.reject(new Error("third"))
    ]);
    expect(result).toBe(42);
  });
});