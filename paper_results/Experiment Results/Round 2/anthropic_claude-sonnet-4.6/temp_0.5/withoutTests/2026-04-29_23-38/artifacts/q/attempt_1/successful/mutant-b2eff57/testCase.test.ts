import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with falsy rejection values", () => {
  it("should reject with an error message when all promises reject with null", async () => {
    const p1 = Q.reject(null);
    const p2 = Q.reject(null);
    
    let rejectionReason: any;
    try {
      await Q.any([p1, p2]);
    } catch (err) {
      rejectionReason = err;
    }
    
    expect(rejectionReason).toBeDefined();
    expect(rejectionReason).toBeInstanceOf(Error);
    expect(rejectionReason.message).toContain("Q can't get fulfillment value from any promise");
  });
});