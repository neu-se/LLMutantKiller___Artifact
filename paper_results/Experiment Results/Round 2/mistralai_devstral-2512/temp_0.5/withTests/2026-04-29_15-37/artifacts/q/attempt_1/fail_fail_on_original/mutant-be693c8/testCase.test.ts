import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout functionality", () => {
  it("should reject with timeout error when promise exceeds timeout", async () => {
    const timeoutPromise = Q.delay(100).timeout(10);
    await expect(timeoutPromise).rejects.toThrow();
  });
});