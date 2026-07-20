import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor behavior", () => {
  it("should not set exception property on a fulfilled promise", async () => {
    const fulfilledPromise = Q(42);
    const inspection = fulfilledPromise.inspect();
    
    // A fulfilled promise should have state "fulfilled" and value 42
    expect(inspection.state).toBe("fulfilled");
    expect(inspection.value).toBe(42);
    
    // The exception property should not be set on a fulfilled promise
    expect((fulfilledPromise as any).exception).toBeUndefined();
    
    // Verify the promise resolves correctly
    const value = await fulfilledPromise;
    expect(value).toBe(42);
  });
});