import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect state", () => {
  it("should report fulfilled state for a fulfilled promise, not rejected", () => {
    const fulfilledPromise = Q(42);
    const inspection = fulfilledPromise.inspect();
    expect(inspection.state).toBe("fulfilled");
    expect(inspection.state).not.toBe("rejected");
    expect((inspection as any).reason).toBeUndefined();
    expect((inspection as any).value).toBe(42);

    const rejectedPromise = Q.reject(new Error("test error"));
    const rejectedInspection = rejectedPromise.inspect();
    expect(rejectedInspection.state).toBe("rejected");
    expect(rejectedInspection.state).not.toBe("fulfilled");
    expect((rejectedInspection as any).reason).toBeInstanceOf(Error);

    // A fulfilled promise should not have exception property set
    // (which would happen if the condition `if (true)` ran instead of
    // `if (inspected.state === "rejected")` on a fulfilled promise)
    expect((fulfilledPromise as any).exception).toBeUndefined();
  });
});