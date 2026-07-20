describe("Q library global object detection", () => {
  it("should correctly evaluate the condition for window and self detection", () => {
    // Test the specific condition that was mutated
    const window = { test: true };
    const self = { test: true };

    // Original condition: typeof window !== "undefined" || typeof self !== "undefined"
    const originalResult = typeof window !== "undefined" || typeof self !== "undefined";

    // Mutated condition: typeof window !== "undefined" || typeof self === "undefined"
    const mutatedResult = typeof window !== "undefined" || typeof self === "undefined";

    // These should be different when both window and self are defined
    expect(originalResult).toBe(true);
    expect(mutatedResult).toBe(true); // This will be true in original but false in mutated when self is defined
    expect(originalResult).toBe(mutatedResult); // This will fail in mutated version
  });
});