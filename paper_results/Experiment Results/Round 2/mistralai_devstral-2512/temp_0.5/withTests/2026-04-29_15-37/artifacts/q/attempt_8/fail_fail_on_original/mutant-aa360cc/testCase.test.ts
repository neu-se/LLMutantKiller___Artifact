// Test file to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

// We need to access the internal deprecate function that's used by Q
// Since it's not exported, we'll test it through a function that uses it
describe("deprecate function behavior", () => {
  it("should show that deprecated functions log warnings", () => {
    // Mock console.warn to capture warnings
    const originalWarn = console.warn;
    const warnings: any[] = [];
    console.warn = (...args: any[]) => {
      warnings.push(args);
    };

    try {
      // Get the Q object
      const Q = qModule.Q || qModule;

      // Test through Q.makePromise which uses deprecate internally
      // This will trigger the deprecate function's warning behavior
      const promise = Q.makePromise({
        "when": function() {
          return "test";
        }
      });

      // The original code should have logged a warning
      // The mutated code won't log anything
      expect(warnings.length).toBeGreaterThan(0);

      // Check that the warning contains expected text
      const warningText = warnings[0][0];
      expect(typeof warningText).toBe('string');
      expect(warningText).toContain('is deprecated');

    } finally {
      console.warn = originalWarn;
    }
  });
});