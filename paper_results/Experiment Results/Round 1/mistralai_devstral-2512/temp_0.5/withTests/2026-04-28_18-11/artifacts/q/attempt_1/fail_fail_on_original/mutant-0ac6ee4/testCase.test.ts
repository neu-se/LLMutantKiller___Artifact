import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout error message", () => {
  it("should include 'ms' in the timeout error message", async () => {
    const timeoutMs = 10;
    const delayMs = 50;

    const timeoutPromise = Q.delay(delayMs).timeout(timeoutMs);

    try {
      await timeoutPromise;
      throw new Error("Expected promise to reject");
    } catch (error) {
      expect(error.message).toContain("ms");
      expect(error.message).toContain(timeoutMs.toString());
    }
  });
});