import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.thenResolve", () => {
  it("should resolve with the provided value", async () => {
    const value = "test";
    const promise = Q.resolve().thenResolve(value);
    await expect(promise).resolves.toBe(value);
  });
});