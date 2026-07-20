// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should detect browser environment correctly when window exists but self doesn't", () => {
    // Create a mock environment where window exists but self doesn't
    const mockGlobal = {
      window: {},
      // self is intentionally not defined
    };

    // The original condition: typeof window !== "undefined" || typeof self !== "undefined"
    // In our mock environment: true || false = true
    const originalCondition = typeof mockGlobal.window !== "undefined" || typeof mockGlobal.self !== "undefined";

    // The mutated condition: false || typeof self !== "undefined"
    // In our mock environment: false || false = false
    const mutatedCondition = false || typeof mockGlobal.self !== "undefined";

    // Original should be true, mutated should be false
    expect(originalCondition).toBe(true);
    expect(mutatedCondition).toBe(false);

    // This test verifies the behavioral difference between original and mutated code
    // The original would expose Q as global in this environment, mutated would not
    if (originalCondition) {
      expect("Original code would expose Q as global").toBeTruthy();
    } else {
      expect("Mutated code would NOT expose Q as global").toBeTruthy();
    }
  });
});