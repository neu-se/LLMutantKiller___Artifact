import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should reject when all promises are rejected", async () => {
    const p1 = Q.reject(new Error("error1"));
    const p2 = Q.reject(new Error("error2"));
    const p3 = Q.reject(new Error("error3"));

    // With original code: pendingCount decrements to 0, triggering rejection
    // With mutated code: pendingCount keeps incrementing, never triggers rejection
    await expect(Q.any([p1, p2, p3])).rejects.toBeDefined();
  });
});