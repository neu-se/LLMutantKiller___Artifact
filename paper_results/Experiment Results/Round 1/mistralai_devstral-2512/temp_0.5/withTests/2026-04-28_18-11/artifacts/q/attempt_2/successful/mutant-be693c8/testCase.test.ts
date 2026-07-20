import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout functionality", () => {
  it("should reject with timeout error when promise exceeds timeout", async () => {
    const delayPromise = Q.delay(100);
    const timeoutPromise = delayPromise.timeout(10);

    await expect(timeoutPromise).rejects.toThrow();
  });
});