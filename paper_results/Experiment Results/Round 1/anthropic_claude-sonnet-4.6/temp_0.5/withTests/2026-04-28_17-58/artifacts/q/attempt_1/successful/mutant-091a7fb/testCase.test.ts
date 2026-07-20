import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("rejects when all promises in the array are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const promises = [deferred1.promise, deferred2.promise, deferred3.promise];
    const anyPromise = Q.any(promises);

    deferred1.reject(new Error("first rejection"));
    deferred2.reject(new Error("second rejection"));
    deferred3.reject(new Error("third rejection"));

    let rejected = false;
    let fulfilled = false;

    await anyPromise.then(
      () => { fulfilled = true; },
      () => { rejected = true; }
    );

    expect(fulfilled).toBe(false);
    expect(rejected).toBe(true);
  });
});