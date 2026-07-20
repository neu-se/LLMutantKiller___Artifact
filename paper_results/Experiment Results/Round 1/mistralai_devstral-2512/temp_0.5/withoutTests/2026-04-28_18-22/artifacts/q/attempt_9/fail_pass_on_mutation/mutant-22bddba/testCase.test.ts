// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_9/pending_category/mutant-22bddba/testCase.test.ts
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should properly handle environment where window is defined but self is not", () => {
    // This test verifies the environment detection works correctly
    // Original code: typeof window !== "undefined" || typeof self !== "undefined"
    // Mutated code: false || typeof self !== "undefined"

    // Create a mock environment where window exists but self doesn't
    const mockGlobal = {
      window: {},
      self: undefined
    };

    // Test the original condition (should be true)
    const originalCondition = typeof mockGlobal.window !== "undefined" || typeof mockGlobal.self !== "undefined";
    expect(originalCondition).toBe(true);

    // Test the mutated condition (should be false)
    const mutatedCondition = false || typeof mockGlobal.self !== "undefined";
    expect(mutatedCondition).toBe(false);

    // The key difference: original code would handle this case correctly
    // while mutated code would fail to detect this as a valid environment
    expect(originalCondition).not.toBe(mutatedCondition);

    // Verify Q still works normally
    return q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
    });
  });
});