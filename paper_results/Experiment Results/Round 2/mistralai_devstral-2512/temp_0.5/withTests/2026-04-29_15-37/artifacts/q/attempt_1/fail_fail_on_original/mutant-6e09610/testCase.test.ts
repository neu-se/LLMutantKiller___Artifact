import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("thenResolve behavior", () => {
  it("should resolve with the provided value", async () => {
    const testValue = "expected_value";
    const promise = Q.resolve().thenResolve(testValue);
    await expect(promise).resolves.toBe(testValue);
  });
});