import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejects when all promises are rejected", () => {
  it("should reject after all promises are rejected", (done) => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    deferred1.reject(new Error("first rejection"));
    deferred2.reject(new Error("second rejection"));

    let settled = false;

    promise.then(
      () => {
        settled = true;
        done(new Error("Expected rejection but got fulfillment"));
      },
      (err: Error) => {
        settled = true;
        expect(err).toBeDefined();
        done();
      }
    );

    setTimeout(() => {
      if (!settled) {
        done(new Error("Promise never settled - pendingCount mutation likely caused infinite hang"));
      }
    }, 500);
  });
});