import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];
    const resultPromise = Q.any(promises);

    // Reject all promises
    deferred1.reject(new Error("First rejection"));
    deferred2.reject(new Error("Second rejection"));

    // Wait for the result promise to settle
    await expect(resultPromise).rejects.toBeDefined();
    expect(resultPromise.inspect().state).toBe("rejected");
  });
});