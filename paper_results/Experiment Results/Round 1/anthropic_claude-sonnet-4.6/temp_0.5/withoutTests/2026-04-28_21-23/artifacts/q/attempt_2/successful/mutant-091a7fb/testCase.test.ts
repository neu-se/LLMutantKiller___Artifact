import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should reject when all promises are rejected", async () => {
    const p1 = Q.reject(new Error("error 1"));
    const p2 = Q.reject(new Error("error 2"));
    const p3 = Q.reject(new Error("error 3"));

    await expect(Q.any([p1, p2, p3])).rejects.toBeTruthy();
  });
});