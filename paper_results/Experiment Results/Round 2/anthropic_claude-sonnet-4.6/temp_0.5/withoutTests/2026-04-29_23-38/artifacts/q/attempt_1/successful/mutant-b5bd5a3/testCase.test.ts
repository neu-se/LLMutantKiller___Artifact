import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q rejected promise exception property", () => {
  it("should set the exception property on a rejected promise", () => {
    const reason = new Error("test error");
    const rejectedPromise = Q.reject(reason);
    
    // In original code, the `if (inspect)` block runs and sets promise.exception
    // In mutated code, `if (false)` means exception is never set
    expect(rejectedPromise.exception).toBe(reason);
  });
});