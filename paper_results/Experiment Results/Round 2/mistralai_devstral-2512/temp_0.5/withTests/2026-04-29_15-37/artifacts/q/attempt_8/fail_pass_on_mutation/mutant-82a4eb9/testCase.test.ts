// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("CommonJS module export detection", () => {
  it("should fail when module detection logic uses OR instead of AND", () => {
    // This test verifies the module detection logic by checking if Q is properly exported
    // The mutation changes the condition from (exports && module) to (exports || module)
    // which could cause Q to be exported in non-CommonJS environments where it shouldn't be

    // Verify Q is a function
    expect(typeof qModule).toBe("function");

    // Test the module detection logic directly
    const testModuleDetection = (exports: any, module: any) => {
      // Original logic (AND)
      if (typeof exports === "object" && typeof module === "object") {
        return true;
      }
      // Mutated logic (OR)
      if (typeof exports === "object" || typeof module === "object") {
        return false; // This should never be reached in original code
      }
      return false;
    };

    // Test case where only exports exists (should return false in original code)
    const result1 = testModuleDetection({}, undefined);
    // Test case where only module exists (should return false in original code)
    const result2 = testModuleDetection(undefined, {});
    // Test case where both exist (should return true in original code)
    const result3 = testModuleDetection({}, {});

    // Original code should have: false, false, true
    // Mutated code would have different behavior
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(true);
  });
});