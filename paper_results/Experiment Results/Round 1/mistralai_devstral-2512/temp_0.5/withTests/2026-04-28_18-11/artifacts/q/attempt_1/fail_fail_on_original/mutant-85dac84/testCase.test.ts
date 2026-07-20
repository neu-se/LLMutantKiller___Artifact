import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("thenReject mutation test", () => {
  it("should reject with the provided reason when thenReject is called", async () => {
    const reason = new Error("test rejection");
    const promise = Q.resolve(42).thenReject(reason);
    await expect(promise).rejects.toThrow(reason);
  });
});