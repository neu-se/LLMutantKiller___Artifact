import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q reduce behavior", () => {
  it("should handle Q.all with sparse-like promise arrays", async () => {
    const result = await Q.all([Q.resolve(42)]);
    expect(result).toEqual([42]);
  });
});