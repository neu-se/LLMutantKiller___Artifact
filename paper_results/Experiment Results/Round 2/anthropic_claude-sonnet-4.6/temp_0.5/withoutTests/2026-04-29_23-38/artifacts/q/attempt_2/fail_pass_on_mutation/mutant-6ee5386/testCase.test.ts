import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.prototype.finally propagates rejection", () => {
  it("should reject with original reason when finally callback succeeds after a rejection", async () => {
    const originalError = new Error("original rejection");
    
    // A rejected promise with a finally callback that succeeds (does not throw)
    const promise = Q.reject(originalError)["finally"](function () {
      // callback succeeds - does nothing
      return Q.resolve();
    });

    let caughtError: Error | null = null;
    let resolvedValue: any = undefined;

    try {
      resolvedValue = await promise;
    } catch (e) {
      caughtError = e as Error;
    }

    // The original rejection should propagate through the finally
    expect(caughtError).toBe(originalError);
    expect(resolvedValue).toBeUndefined();
  });
});