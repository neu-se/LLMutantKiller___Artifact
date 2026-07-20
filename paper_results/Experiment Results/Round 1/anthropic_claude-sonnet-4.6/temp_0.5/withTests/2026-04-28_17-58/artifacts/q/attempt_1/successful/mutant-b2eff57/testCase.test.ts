import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with all promises rejected with falsy values", () => {
  it("should reject with an Error containing the expected message when all promises are rejected with null", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    deferred1.reject(null);
    deferred2.reject(null);

    let rejectionReason: any;
    try {
      await promise;
      throw new Error("Expected promise to be rejected");
    } catch (err) {
      rejectionReason = err;
    }

    expect(rejectionReason).toBeInstanceOf(Error);
    expect(typeof rejectionReason.message).toBe("string");
    expect(rejectionReason.message).toContain("Q can't get fulfillment value from any promise");
  });
});