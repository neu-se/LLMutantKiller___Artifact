import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect function behavior", () => {
  it("should return fulfilled state for a fulfilled promise", async () => {
    // Q.fulfill creates a Promise with a custom inspect function that returns {state: "fulfilled", value: ...}
    // In the original code: if (inspect === void 0) sets default only when inspect is not provided
    // In the mutated code: if (inspect !== void 0) overwrites the provided inspect with {state: "unknown"}
    // So a fulfilled promise's inspect() would return {state: "unknown"} instead of {state: "fulfilled"}
    
    const value = 42;
    const fulfilledPromise = Q(value);
    
    const inspected = fulfilledPromise.inspect();
    
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(value);
  });
});