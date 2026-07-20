import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback behavior", () => {
  it("should correctly handle Q.any with all rejected promises", async () => {
    const err1 = new Error("error1");
    const err2 = new Error("error2");
    
    try {
      await Q.any([Q.reject(err1), Q.reject(err2)]);
      fail("Should have rejected");
    } catch (e: any) {
      expect(e.message).toContain("Q can't get fulfillment value from any promise");
      expect(e.message).toContain(err2.message);
    }
  });
});