const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any behavior with multiple rejections", () => {
  it("should reject when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const resultPromise = Q.any(promises);

    deferred1.reject(new Error("First error"));
    deferred2.reject(new Error("Second error"));

    await expect(resultPromise).rejects.toBeDefined();
  });
});