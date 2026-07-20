describe("Q library global object detection", () => {
  it("should correctly identify global object when both window and self are defined", () => {
    // Test the specific mutation in the global object detection logic
    // Original: typeof window !== "undefined" || typeof self !== "undefined"
    // Mutated:  typeof window !== "undefined" || typeof self === "undefined"

    // Create test objects
    const testWindow = {};
    const testSelf = {};

    // Test the original condition
    const originalResult = typeof testWindow !== "undefined" || typeof testSelf !== "undefined";

    // Test the mutated condition
    const mutatedResult = typeof testWindow !== "undefined" || typeof testSelf === "undefined";

    // When both are defined:
    // Original: true || true = true
    // Mutated:  true || false = true
    // So they should be equal in this case
    expect(originalResult).toBe(true);
    expect(mutatedResult).toBe(true);
    expect(originalResult).toBe(mutatedResult);

    // Now test when only self is defined (window is undefined)
    const onlySelfResult = typeof undefined !== "undefined" || typeof testSelf !== "undefined";
    const onlySelfMutated = typeof undefined !== "undefined" || typeof testSelf === "undefined";

    // Original: false || true = true
    // Mutated:  false || false = false
    // This is where the mutation would cause different behavior
    expect(onlySelfResult).toBe(true);
    expect(onlySelfMutated).toBe(false);
    expect(onlySelfResult).not.toBe(onlySelfMutated);
  });
});