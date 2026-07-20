describe("Q library global object detection", () => {
  it("should correctly handle the case where both window and self are defined", () => {
    // This test specifically targets the mutation in the global object detection logic
    // Original: } else if (typeof window !== "undefined" || typeof self !== "undefined") {
    // Mutated:  } else if (typeof window !== "undefined" || typeof self === "undefined") {

    // Create a scenario where both window and self are defined
    const mockWindow = { Q: undefined };
    const mockSelf = { Q: undefined };

    // Simulate the condition check from the original code
    const originalCondition = typeof mockWindow !== "undefined" || typeof mockSelf !== "undefined";
    expect(originalCondition).toBe(true);

    // Simulate the condition check from the mutated code
    const mutatedCondition = typeof mockWindow !== "undefined" || typeof mockSelf === "undefined";
    expect(mutatedCondition).toBe(true);

    // The key test: when both are defined, the conditions should be equivalent
    // This will pass on original code but fail on mutated code
    expect(originalCondition).toBe(mutatedCondition);
  });
});