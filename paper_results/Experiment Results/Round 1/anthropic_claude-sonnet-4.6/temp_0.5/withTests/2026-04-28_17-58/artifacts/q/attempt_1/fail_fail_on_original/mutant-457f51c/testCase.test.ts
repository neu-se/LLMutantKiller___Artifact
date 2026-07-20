import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect state", () => {
  it("should return fulfilled state for a resolved promise and not have exception property set on fulfilled promises", () => {
    const fulfilledPromise = Q(42);
    const inspection = fulfilledPromise.inspect();
    
    expect(inspection.state).toBe("fulfilled");
    expect(inspection.value).toBe(42);
    
    // A fulfilled promise should not have an exception property
    // The mutation changes `if (inspected.state === "rejected")` to `if (true)`
    // which would incorrectly set exception on fulfilled promises if the dead code were active
    // This test verifies the correct behavior
    expect((fulfilledPromise as any).exception).toBeUndefined();
    
    const rejectedPromise = Q.reject(new Error("test error"));
    const rejectedInspection = rejectedPromise.inspect();
    expect(rejectedInspection.state).toBe("rejected");
    expect((rejectedPromise as any).exception).toBeUndefined();
  });
});