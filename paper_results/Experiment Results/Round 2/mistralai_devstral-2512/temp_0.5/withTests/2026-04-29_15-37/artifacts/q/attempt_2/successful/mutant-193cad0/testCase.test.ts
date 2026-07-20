const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any rejection behavior", () => {
  it("should reject with an error when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const promise = Q.any(promises);

    // Reject both promises
    deferred1.reject(new Error("First error"));
    deferred2.reject(new Error("Second error"));

    // Wait for the promise to settle
    await Q.delay(100);

    // Verify the promise is rejected
    expect(promise.isRejected()).toBe(true);

    // Verify the rejection reason contains the expected error message
    const inspect = promise.inspect();
    expect(inspect.state).toBe("rejected");
    expect(inspect.reason.message).toContain("Q can't get fulfillment value from any promise");
  });
});