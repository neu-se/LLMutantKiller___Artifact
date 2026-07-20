import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce shim behavior via Q.any", () => {
  it("should reject when all promises in any() are rejected", async () => {
    // array_reduce is used in Q.any to track pendingCount
    // If the reduce loop body is skipped, pendingCount stays 0
    // causing immediate rejection with wrong behavior
    const err1 = new Error("error1");
    const err2 = new Error("error2");
    
    try {
      await Q.any([Q.reject(err1), Q.reject(err2)]);
      fail("Should have rejected");
    } catch (e: any) {
      expect(e.message).toContain("Q can't get fulfillment value from any promise");
    }
  });
});