import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property", () => {
  it("should not set exception on fulfilled promise when inner condition is always true", () => {
    const reason = new Error("test error");
    const rejectedPromise = Q.reject(reason);
    const fulfilledPromise = Q(42);
    
    // With mutation if(true), exception would be set even on fulfilled promises
    expect((fulfilledPromise as any).exception).toBeUndefined();
  });
});