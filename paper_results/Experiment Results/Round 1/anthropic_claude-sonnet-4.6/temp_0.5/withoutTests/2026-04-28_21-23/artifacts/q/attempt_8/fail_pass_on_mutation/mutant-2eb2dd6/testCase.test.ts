import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with all rejected promises", () => {
  it("should reject when all promises are rejected, using pendingCount correctly", async () => {
    const err1 = new Error("error 1");
    const err2 = new Error("error 2");
    const err3 = new Error("error 3");
    
    try {
      await Q.any([Q.reject(err1), Q.reject(err2), Q.reject(err3)]);
      fail("Should have rejected");
    } catch (e: any) {
      expect(e.message).toContain("Last error message: error 3");
    }
  });
});