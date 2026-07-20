import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject when all promises in the array are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const promise = Q.any([
      deferred1.promise,
      deferred2.promise,
      deferred3.promise,
    ]);

    deferred1.reject(new Error("first rejection"));
    deferred2.reject(new Error("second rejection"));
    deferred3.reject(new Error("third rejection"));

    let fulfilled = false;
    let rejected = false;
    let rejectionReason: any = null;

    await promise.then(
      () => {
        fulfilled = true;
      },
      (reason: any) => {
        rejected = true;
        rejectionReason = reason;
      }
    );

    expect(fulfilled).toBe(false);
    expect(rejected).toBe(true);
    expect(rejectionReason).toBeInstanceOf(Error);
    expect(rejectionReason.message).toContain(
      "Q can't get fulfillment value from any promise, all promises were rejected"
    );
  });
});