import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property", () => {
  it("should set the exception property on a rejected promise created via Q.reject", () => {
    const reason = new Error("test rejection reason");
    const rejectedPromise = Q.reject(reason);
    
    // The original code sets promise.exception when inspect returns state === "rejected"
    // The mutated code (if (false)) never sets this property
    expect((rejectedPromise as any).exception).toBe(reason);
  });
});