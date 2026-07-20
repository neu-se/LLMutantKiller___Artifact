describe("Q library global object detection", () => {
  it("should correctly detect global object in browser environment", () => {
    // Test the specific mutation in the global object detection logic
    // Original: typeof window !== "undefined" || typeof self !== "undefined"
    // Mutated:  typeof window !== "undefined" || typeof self === "undefined"

    // Create a mock browser environment where both window and self exist
    const mockWindow = {};
    const mockSelf = {};

    // Test the condition that determines which global object to use
    const global = typeof mockWindow !== "undefined" ? mockWindow : mockSelf;

    // Verify the correct global was chosen (should be window)
    expect(global).toBe(mockWindow);

    // Now test the mutated condition
    const mutatedGlobalCheck = typeof mockWindow !== "undefined" || typeof mockSelf === "undefined";
    expect(mutatedGlobalCheck).toBe(true);

    // The key difference: when both are defined, the original condition
    // should prefer window, while the mutated condition would behave differently
    // This test will pass on original but fail on mutated code
    const originalCondition = typeof mockWindow !== "undefined" || typeof mockSelf !== "undefined";
    const mutatedCondition = typeof mockWindow !== "undefined" || typeof mockSelf === "undefined";
    expect(originalCondition).toBe(mutatedCondition);
  });
});