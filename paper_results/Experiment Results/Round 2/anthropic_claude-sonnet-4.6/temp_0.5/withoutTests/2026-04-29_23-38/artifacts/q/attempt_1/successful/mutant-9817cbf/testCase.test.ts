import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection handling", () => {
  it("should reject with an Error when all promises are rejected", async () => {
    const err1 = new Error("first error");
    const err2 = new Error("second error");

    const promise = Q.any([Q.reject(err1), Q.reject(err2)]);

    let caughtReason: any;
    try {
      await promise;
    } catch (reason) {
      caughtReason = reason;
    }

    // In the original code, rejection is `err || new Error("" + err)`
    // which would be the actual error object (err2 in this case).
    // In the mutated code, rejection is `false`, so the promise rejects with `false`.
    expect(caughtReason).toBeInstanceOf(Error);
  });
});