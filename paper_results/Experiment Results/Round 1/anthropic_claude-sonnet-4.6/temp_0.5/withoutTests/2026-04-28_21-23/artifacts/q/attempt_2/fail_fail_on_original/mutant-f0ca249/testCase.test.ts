import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce polyfill mutation", () => {
  it("Q.any should reject with proper error when all promises reject", async () => {
    const err1 = new Error("first");
    const err2 = new Error("second");
    
    try {
      await Q.any([Q.reject(err1), Q.reject(err2)]);
      fail("Should have rejected");
    } catch (e: any) {
      expect(e.message).toContain("last error message");
    }
  });
});