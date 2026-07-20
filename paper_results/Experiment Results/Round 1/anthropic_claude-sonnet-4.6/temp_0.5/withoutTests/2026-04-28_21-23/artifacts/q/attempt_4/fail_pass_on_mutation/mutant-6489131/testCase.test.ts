import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce shim", () => {
  it("Q.any resolves with first fulfilled value", async () => {
    const result = await Q.any([Q.reject(new Error("fail")), Q.resolve(42)]);
    expect(result).toBe(42);
  });
});