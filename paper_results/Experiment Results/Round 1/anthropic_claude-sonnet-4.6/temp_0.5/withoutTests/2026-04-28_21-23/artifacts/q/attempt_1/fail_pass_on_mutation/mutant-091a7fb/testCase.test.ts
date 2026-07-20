import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should resolve with the first fulfilled promise when given multiple promises", async () => {
    const p1 = Q.reject(new Error("first rejected"));
    const p2 = Q.resolve(42);
    const p3 = Q.resolve(100);

    const result = await Q.any([p1, p2, p3]);
    expect(result).toBe(42);
  });
});