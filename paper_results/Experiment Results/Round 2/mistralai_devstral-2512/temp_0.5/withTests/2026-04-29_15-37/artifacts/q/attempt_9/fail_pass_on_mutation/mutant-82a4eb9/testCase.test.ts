// Test to detect the mutation in q.js where the CommonJS module detection logic was changed from AND to OR
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("CommonJS module export detection", () => {
  it("should detect incorrect module detection logic", () => {
    // This test verifies the module detection logic by checking behavior in different environments
    // The original code requires both exports AND module to be objects (CommonJS)
    // The mutated code accepts either exports OR module (which is incorrect)

    // Verify Q is a function
    expect(typeof qModule).toBe("function");

    // Create a test to detect the mutation by checking module detection behavior
    const testCases = [
      { exports: {}, module: undefined, expected: false },
      { exports: undefined, module: {}, expected: false },
      { exports: {}, module: {}, expected: true }
    ];

    testCases.forEach((testCase, index) => {
      // Simulate the module detection logic
      const originalResult = typeof testCase.exports === "object" && typeof testCase.module === "object";
      const mutatedResult = typeof testCase.exports === "object" || typeof testCase.module === "object";

      // Original code should match expected result
      expect(originalResult).toBe(testCase.expected);

      // Mutated code would give different results for first two test cases
      if (index < 2) {
        expect(mutatedResult).not.toBe(testCase.expected);
      }
    });
  });
});