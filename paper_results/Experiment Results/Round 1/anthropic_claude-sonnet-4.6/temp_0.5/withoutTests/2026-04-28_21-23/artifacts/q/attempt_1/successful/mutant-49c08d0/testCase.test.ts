import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect function behavior", () => {
  it("should correctly inspect a fulfilled promise state", async () => {
    // fulfill() creates a Promise with an inspect function that returns {state: "fulfilled", value: ...}
    // With the original code: if (inspect === void 0) sets default only when inspect is missing
    // With the mutated code: if (inspect !== void 0) overwrites the provided inspect with default {state: "unknown"}
    
    const fulfilledPromise = Q(42);
    
    // The inspect() method should return the fulfilled state with the value
    const inspected = fulfilledPromise.inspect();
    
    // In original code: inspect returns {state: "fulfilled", value: 42}
    // In mutated code: inspect returns {state: "unknown"} because the provided inspect was overwritten
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
  });
});