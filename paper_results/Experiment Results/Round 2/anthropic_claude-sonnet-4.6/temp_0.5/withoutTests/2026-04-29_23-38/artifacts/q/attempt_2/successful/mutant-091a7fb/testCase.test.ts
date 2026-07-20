import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should reject when all promises are rejected", async () => {
    const p1 = Q.reject(new Error("first"));
    const p2 = Q.reject(new Error("second"));
    const p3 = Q.reject(new Error("third"));

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1000));
    
    await expect(Promise.race([Q.any([p1, p2, p3]), timeoutPromise])).rejects.toMatchObject({ message: expect.not.stringContaining("timeout") });
  });
});