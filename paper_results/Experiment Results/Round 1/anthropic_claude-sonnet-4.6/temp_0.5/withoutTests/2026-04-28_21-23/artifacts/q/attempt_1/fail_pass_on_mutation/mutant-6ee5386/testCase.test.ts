import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.finally error propagation", () => {
  it("should reject the promise when the finally callback throws an error", async () => {
    const callbackError = new Error("callback error");
    
    let resolvedValue: unknown = undefined;
    let rejectedReason: unknown = undefined;

    await Q.resolve(42)
      ["finally"](function () {
        throw callbackError;
      })
      .then(
        function (value: unknown) {
          resolvedValue = value;
        },
        function (reason: unknown) {
          rejectedReason = reason;
        }
      );

    // With threw = true (original): the callback error should cause rejection
    // With threw = false (mutated): the promise might resolve instead of reject
    expect(rejectedReason).toBe(callbackError);
    expect(resolvedValue).toBeUndefined();
  });
});