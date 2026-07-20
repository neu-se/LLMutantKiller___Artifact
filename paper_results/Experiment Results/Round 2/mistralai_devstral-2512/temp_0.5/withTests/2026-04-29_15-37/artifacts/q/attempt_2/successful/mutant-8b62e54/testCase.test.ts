import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with a proper error when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const error = new Error("Test error");

    // Reject all promises
    deferred1.reject(error);
    deferred2.reject(error);

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    await expect(promise).rejects.toThrow();
  });
});