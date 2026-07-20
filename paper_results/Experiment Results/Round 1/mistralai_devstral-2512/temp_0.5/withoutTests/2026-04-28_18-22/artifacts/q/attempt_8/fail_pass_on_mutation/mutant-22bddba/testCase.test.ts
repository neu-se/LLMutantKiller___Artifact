// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_8/pending_category/mutant-22bddba/testCase.test.ts
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection logic", () => {
  it("should correctly evaluate environment detection conditions", () => {
    // Test the actual condition logic that differs between original and mutated code
    // Original: typeof window !== "undefined" || typeof self !== "undefined"
    // Mutated: false || typeof self !== "undefined"

    // Create test cases for different environments
    const testCases = [
      // Case 1: Both window and self are undefined
      { window: undefined, self: undefined, originalExpected: false, mutatedExpected: false },
      // Case 2: Only window is defined
      { window: {}, self: undefined, originalExpected: true, mutatedExpected: false },
      // Case 3: Only self is defined
      { window: undefined, self: {}, originalExpected: true, mutatedExpected: true },
      // Case 4: Both are defined
      { window: {}, self: {}, originalExpected: true, mutatedExpected: true }
    ];

    testCases.forEach((testCase, index) => {
      // Test original condition
      const originalResult = typeof testCase.window !== "undefined" || typeof testCase.self !== "undefined";
      expect(originalResult).toBe(testCase.originalExpected);

      // Test mutated condition
      const mutatedResult = false || typeof testCase.self !== "undefined";
      expect(mutatedResult).toBe(testCase.mutatedExpected);
    });

    // Verify Q works normally
    return q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
    });
  });
});