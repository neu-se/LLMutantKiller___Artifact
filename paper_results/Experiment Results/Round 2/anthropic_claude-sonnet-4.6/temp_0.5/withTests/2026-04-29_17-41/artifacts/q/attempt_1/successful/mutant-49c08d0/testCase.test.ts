import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor inspect parameter", () => {
  it("should use the provided inspect function when inspect is given, not override it with the default", () => {
    // Q.fulfill creates a Promise with an explicit inspect function
    // that returns { state: "fulfilled", value: value }
    // With the mutation (inspect !== void 0), the provided inspect would be
    // overridden with the default { state: "unknown" } function
    const fulfilledPromise = Q.fulfill(42);
    const inspected = fulfilledPromise.inspect();
    
    // Original code: inspect is provided, so it is used as-is -> state: "fulfilled"
    // Mutated code: inspect is provided (not void 0), so condition is true and
    //               inspect gets replaced with default -> state: "unknown"
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
  });
});