import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should reject with an error message when all promises are rejected", async () => {
    const d1 = Q.defer();
    const d2 = Q.defer();

    const promise = Q.any([d1.promise, d2.promise]);

    d1.reject(new Error("first error"));
    d2.reject(new Error("second error"));

    await Q.delay(250);

    expect(promise.isRejected()).toBe(true);
    const reason = promise.inspect().reason;
    expect(reason).toBeDefined();
    expect(reason.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected");
  });
});