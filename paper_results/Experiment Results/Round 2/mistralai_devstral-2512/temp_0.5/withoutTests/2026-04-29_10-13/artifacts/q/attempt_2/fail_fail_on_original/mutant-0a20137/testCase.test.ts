import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
  it("should return a promise that resolves when both promises resolve to the same value", async () => {
    const promise1 = Q.resolve(42);
    const promise2 = Q.resolve(42);
    const result = await Q.join(promise1, promise2);
    expect(result).toBe(42);
  });
});