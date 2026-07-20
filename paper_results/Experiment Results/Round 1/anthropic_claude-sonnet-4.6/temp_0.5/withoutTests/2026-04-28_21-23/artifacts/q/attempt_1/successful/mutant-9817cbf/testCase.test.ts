import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection handling", () => {
  it("should reject with an Error when all promises are rejected", async () => {
    const err1 = new Error("first error");
    const err2 = new Error("second error");
    const err3 = new Error("third error");

    const promise = Q.any([
      Q.reject(err1),
      Q.reject(err2),
      Q.reject(err3),
    ]);

    let caughtReason: any;
    try {
      await promise;
    } catch (reason) {
      caughtReason = reason;
    }

    // In the original code, rejection is set to `err || new Error("" + err)`
    // which means it should be a truthy Error object.
    // In the mutated code, rejection is set to `false`, which is falsy.
    // The deferred.reject(rejection) call should reject with a meaningful error,
    // not with `false`.
    expect(caughtReason).toBeTruthy();
    expect(caughtReason).not.toBe(false);
  });
});