import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejects when all promises are rejected", () => {
  it("should reject the returned promise when all input promises are rejected", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    deferred1.reject(new Error("first rejection"));
    deferred2.reject(new Error("second rejection"));

    return promise.then(
      () => {
        throw new Error("Expected promise to be rejected, but it was fulfilled");
      },
      (err: Error) => {
        expect(err).toBeDefined();
        expect(err.message).toContain("second rejection");
      }
    ).timeout(1000);
  });
});