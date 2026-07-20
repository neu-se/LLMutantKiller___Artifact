import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
  it("should reject when values are not the same", async () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.resolve(2);
    await expect(promise1.join(promise2)).rejects.toThrow("Q can't join: not the same: 1 2");
  });
});