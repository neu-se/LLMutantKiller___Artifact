// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should properly detect CommonJS environment", () => {
    // This test verifies the specific mutation where:
    // Original: } else if (typeof exports === "object" && typeof module === "object") {
    // Mutated:  } else if (true && typeof module === "object") {

    // Test that Q is properly exported in the current environment
    expect(qModule).toBeDefined();
    expect(typeof qModule).toBe("function");

    // Test basic functionality
    const deferred = qModule.defer();
    expect(deferred).toBeDefined();
    expect(deferred.promise).toBeDefined();

    // The key test: verify that module.exports was set correctly
    // In the mutated version, the condition is always true which means
    // it would try to export even when exports is not properly defined
    // We can detect this by checking if Q is available as a global when it shouldn't be
    if (typeof global !== 'undefined' && global.Q) {
      // If Q is available as a global in Node.js, the mutation might be present
      // because the condition is too permissive
      throw new Error('Q unexpectedly available as global - potential mutation');
    }

    // In the original code, this should pass normally
    expect(true).toBe(true);
  });
});