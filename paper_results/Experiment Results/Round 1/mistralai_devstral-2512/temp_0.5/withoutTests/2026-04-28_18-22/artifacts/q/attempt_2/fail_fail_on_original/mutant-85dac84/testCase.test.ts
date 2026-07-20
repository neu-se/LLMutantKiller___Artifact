import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.thenReject", () => {
  it("should reject with the provided reason when chained", async () => {
    const promise = Q.resolve(42);
    const reason = new Error("Test rejection");

    await expect(promise.thenReject(reason)).rejects.toThrow(reason);
  });
});