import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.prototype.finally with throwing callback on fulfilled promise", () => {
  it("should reject when finally callback throws synchronously on a fulfilled promise", async () => {
    const callbackError = new Error("thrown in finally");
    
    let resolvedValue: any = "not set";
    let caughtError: any = null;

    const promise = Q.resolve(42)["finally"](function () {
      throw callbackError;
    });

    try {
      resolvedValue = await promise;
    } catch (e) {
      caughtError = e;
    }

    // With threw=true (original): the error propagates, promise rejects
    // With threw=false (mutated): the error is not detected, promise may resolve with 42
    expect(caughtError).toBe(callbackError);
    expect(resolvedValue).toBe("not set");
  });
});