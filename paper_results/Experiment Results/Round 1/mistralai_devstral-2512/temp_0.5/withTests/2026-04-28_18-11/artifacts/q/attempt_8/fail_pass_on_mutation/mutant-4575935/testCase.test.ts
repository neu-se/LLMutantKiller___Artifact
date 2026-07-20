// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should have noConflict method in browser-like environments", () => {
    // The noConflict method is only added when running in browser-like environments
    // (when window or self is defined). The mutation changes this condition to always false,
    // so noConflict should not be available in the mutated version.

    // Check if noConflict exists - it should in original code but not in mutated code
    expect(typeof Q.noConflict).toBe('function');
  });
});