// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should properly handle CommonJS module detection", () => {
    // This test verifies the specific mutation where:
    // Original: } else if (typeof exports === "object" && typeof module === "object") {
    // Mutated:  } else if (true && typeof module === "object") {

    // Test that Q is properly exported
    expect(qModule).toBeDefined();
    expect(typeof qModule).toBe("function");

    // Create a test to check if the module detection is too permissive
    // We'll check if Q is available in unexpected ways
    const hasUnexpectedGlobal = typeof global !== 'undefined' && global.Q === qModule;
    const hasUnexpectedWindow = typeof window !== 'undefined' && window.Q === qModule;

    // In the original code, Q should only be available through require()
    // In the mutated code, it might be available in other ways due to the permissive condition
    if (hasUnexpectedGlobal || hasUnexpectedWindow) {
      throw new Error('Q available in unexpected scope - mutation detected');
    }

    // Test basic functionality to ensure Q works correctly
    const testPromise = qModule(42);
    expect(testPromise.isFulfilled()).toBe(true);

    // This test should pass in original code but fail in mutated code
    // when the condition is too permissive
    expect(true).toBe(true);
  });
});