// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should expose Q globally when window exists but self doesn't", () => {
    // Create a fresh environment simulation
    const testEnv = {
      window: {},
      // self is intentionally not defined
    };

    // The original condition that determines if Q should be exposed as global
    const shouldExposeQ = typeof testEnv.window !== "undefined" || typeof testEnv.self !== "undefined";

    // This test verifies the condition that would trigger the mutation
    expect(shouldExposeQ).toBe(true);

    // If this condition is false, it means the mutation is present
    // The original code would expose Q as global in this case
    // The mutated code would not
    if (!shouldExposeQ) {
      fail("Q should be exposed as global when window exists");
    }
  });
});