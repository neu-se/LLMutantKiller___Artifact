import { Q } from "./q";

describe("Promise.thenReject", () => {
  it("should reject with the provided reason", async () => {
    const promise = Q.resolve(42);
    const reason = new Error("Test rejection");
    await expect(promise.thenReject(reason)).rejects.toThrow(reason);
  });
});