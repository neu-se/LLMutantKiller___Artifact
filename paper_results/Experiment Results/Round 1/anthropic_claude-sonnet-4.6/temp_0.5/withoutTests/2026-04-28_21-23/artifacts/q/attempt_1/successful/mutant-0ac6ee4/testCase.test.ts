import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout error message", () => {
  it("should include ' ms' suffix in timeout error message", async () => {
    const timeoutMs = 50;
    try {
      await Q.timeout(Q.defer().promise, timeoutMs);
      fail("Expected promise to be rejected");
    } catch (error: any) {
      expect(error.message).toContain(" ms");
      expect(error.message).toBe("Timed out after " + timeoutMs + " ms");
    }
  });
});