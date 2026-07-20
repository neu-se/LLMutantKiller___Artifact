import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reject with Q.any when all promises reject", async () => {
    const err1 = new Error("first");
    const err2 = new Error("second");
    
    try {
      await Q.any([Q.reject(err1), Q.reject(err2)]);
      fail("should have rejected");
    } catch (e: any) {
      expect(e.message).toContain("all promises were rejected");
    }
  });
});