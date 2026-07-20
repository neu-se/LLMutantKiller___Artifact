const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any behavior with pending promises", () => {
  it("should correctly handle pending promises and reject when all are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const resultPromise = Q.any(promises);

    // Reject both promises with a delay to ensure they are properly tracked
    setTimeout(() => {
      deferred1.reject(new Error("First rejection"));
      deferred2.reject(new Error("Second rejection"));
    }, 10);

    await expect(resultPromise).rejects.toBeDefined();
  });
});