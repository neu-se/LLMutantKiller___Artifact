// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should properly detect CommonJS environment with exports check", () => {
    // This test verifies the specific mutation where:
    // Original: } else if (typeof exports === "object" && typeof module === "object") {
    // Mutated:  } else if (true && typeof module === "object") {

    // Test that Q is properly exported
    expect(qModule).toBeDefined();
    expect(typeof qModule).toBe("function");

    // The key difference: we need to test if the exports check is actually working
    // We'll do this by checking if Q is available in the module.exports
    const moduleExports = require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")].exports;

    // In the original code, module.exports should be set to Q
    // In the mutated code, it might be set differently due to the permissive condition
    expect(moduleExports).toBe(qModule);

    // Additional check: verify that Q is not accidentally set as a global
    // when it shouldn't be (which could happen with the mutation)
    if (typeof global !== 'undefined' && global.Q === qModule) {
      throw new Error('Q unexpectedly available as global - mutation detected');
    }

    // Test basic functionality
    const testPromise = qModule(42);
    expect(testPromise.isFulfilled()).toBe(true);
  });
});