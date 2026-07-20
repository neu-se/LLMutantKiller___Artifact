import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join mutation test", () => {
  it("should reject when two promises fulfill to different values", async () => {
    const value1 = {};
    const value2 = {};
    const promise1 = Q.resolve(value1);
    const promise2 = Q.resolve(value2);
    await expect(Q.join(promise1, promise2)).rejects.toBeDefined();
  });
});