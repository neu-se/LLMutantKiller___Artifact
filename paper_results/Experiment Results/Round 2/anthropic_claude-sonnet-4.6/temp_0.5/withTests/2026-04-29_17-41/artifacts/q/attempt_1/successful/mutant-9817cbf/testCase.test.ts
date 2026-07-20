import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection reason", () => {
  it("should reject with an Error object when all promises are rejected, not false", async () => {
    const err = new Error("test rejection");
    const promise = Q.any([Q.reject(err)]);

    let caughtReason: unknown;
    try {
      await promise;
    } catch (reason) {
      caughtReason = reason;
    }

    expect(caughtReason).toBeInstanceOf(Error);
    expect((caughtReason as Error).message).toContain("test rejection");
  });
});