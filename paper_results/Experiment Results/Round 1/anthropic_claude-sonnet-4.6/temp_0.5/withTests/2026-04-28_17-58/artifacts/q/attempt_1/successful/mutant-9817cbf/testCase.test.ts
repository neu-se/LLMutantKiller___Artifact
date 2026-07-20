import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection reason", () => {
  it("should reject with an error that includes the original rejection message when all promises are rejected", async () => {
    const errorMessage = "specific error message";
    const promise1 = Q.reject(new Error(errorMessage));
    const promise2 = Q.reject(new Error("another error"));

    const result = Q.any([promise1, promise2]);

    await new Promise<void>((resolve) => {
      result.then(
        () => {
          throw new Error("Should have been rejected");
        },
        (reason: Error) => {
          // The rejection reason should contain the original error message
          // Original code: var rejection = err || new Error("" + err)
          // Mutated code: var rejection = false
          // So the message should include the actual error text, not "false"
          expect(reason).toBeInstanceOf(Error);
          expect(reason.message).toContain("Last error message:");
          expect(reason.message).not.toContain("false");
          expect(reason.message).toContain("another error");
          resolve();
        }
      );
    });
  });
});