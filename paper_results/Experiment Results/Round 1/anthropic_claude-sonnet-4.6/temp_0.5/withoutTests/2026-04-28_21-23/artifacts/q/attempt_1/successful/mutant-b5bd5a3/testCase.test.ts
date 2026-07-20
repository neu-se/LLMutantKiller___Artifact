import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor inspect block", () => {
  it("should set the exception property on a rejected promise created via Q.reject", () => {
    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);
    // In the original code, when inspect is provided and state is "rejected",
    // promise.exception is set to inspected.reason.
    // With the mutation (if false), this never happens, so exception is undefined.
    expect(rejectedPromise.exception).toBe(reason);
  });
});