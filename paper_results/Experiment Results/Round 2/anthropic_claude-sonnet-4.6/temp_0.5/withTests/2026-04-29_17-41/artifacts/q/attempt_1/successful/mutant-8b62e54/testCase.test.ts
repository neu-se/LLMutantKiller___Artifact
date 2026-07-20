import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejects with error message when all promises are rejected", () => {
  it("should reject with a descriptive error message when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    const err = new Error("last error");
    deferred1.reject(err);
    deferred2.reject(err);

    await Q.delay(100);

    expect(promise.isRejected()).toBe(true);
    const reason = promise.inspect().reason;
    expect(reason).toBeDefined();
    expect(reason.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected");
  });
});