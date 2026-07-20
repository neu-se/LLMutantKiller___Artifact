import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve with the first fulfilled promise value", async () => {
    const result = await Q.any([Q.reject(new Error("fail")), Q(42), Q(100)]);
    expect(result).toBe(42);
  });
});