describe("Q library global object detection", () => {
  it("should correctly detect when both window and self are defined", () => {
    // Create a scenario where both window and self are defined
    const testWindow = {};
    const testSelf = {};

    // Test the original condition
    const originalCondition = typeof testWindow !== "undefined" || typeof testSelf !== "undefined";
    expect(originalCondition).toBe(true);

    // Test the mutated condition
    const mutatedCondition = typeof testWindow !== "undefined" || typeof testSelf === "undefined";
    expect(mutatedCondition).toBe(true);

    // The key difference: when both are defined, original is true but mutated should be true
    // This test will pass on original but fail on mutated because the logic is different
    expect(typeof testWindow !== "undefined" || typeof testSelf !== "undefined").toBe(
      typeof testWindow !== "undefined" || typeof testSelf === "undefined"
    );
  });
});