import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject with appropriate error when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const anyPromise = Q.any(promises);

    // Reject both promises
    deferred1.reject(new Error("First error"));
    deferred2.reject(new Error("Second error"));

    let error: Error | null = null;
    try {
      await anyPromise;
    } catch (e) {
      error = e as Error;
    }

    expect(error).not.toBeNull();
    expect(error!.message).toContain("Q can't get fulfillment value from any promise");
    expect(error!.message).toContain("Second error");
  });
});