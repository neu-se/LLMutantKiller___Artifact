import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior with rejected promises", () => {
  it("should resolve with the first fulfilled promise when some promises are rejected", async () => {
    // Create promises where some reject and one fulfills
    const p1 = Q.reject(new Error("error1"));
    const p2 = Q(42);
    const p3 = Q.reject(new Error("error3"));

    const result = await Q.any([p1, p2, p3]);
    expect(result).toBe(42);
  });
});