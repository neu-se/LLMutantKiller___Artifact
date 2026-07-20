import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should reject with a descriptive error message when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    deferred1.reject(new Error("first error"));
    deferred2.reject(new Error("second error"));

    await Q.delay(100);

    expect(promise.isRejected()).toBe(true);
    const reason = promise.inspect().reason as Error;
    expect(reason).toBeDefined();
    expect(reason.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected");
  });
});