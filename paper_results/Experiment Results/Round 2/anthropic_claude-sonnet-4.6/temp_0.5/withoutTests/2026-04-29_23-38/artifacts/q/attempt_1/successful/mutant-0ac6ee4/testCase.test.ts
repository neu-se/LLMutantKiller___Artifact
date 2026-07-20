import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout error message", () => {
  it("should include ' ms' suffix in the timeout error message", async () => {
    const ms = 50;
    const promise = Q.timeout(Q.defer().promise, ms);
    
    try {
      await promise;
      throw new Error("Expected promise to be rejected");
    } catch (error: any) {
      expect(error.message).toBe("Timed out after " + ms + " ms");
    }
  });
});