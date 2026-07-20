// Test file to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should log deprecation warning when using deprecated allResolved", () => {
    // Mock console.warn to capture warnings
    const originalWarn = console.warn;
    const warnings: any[] = [];
    console.warn = (...args: any[]) => {
      warnings.push(args);
    };

    try {
      // Get the Q object
      const Q = qModule.Q || qModule;

      // Call the deprecated allResolved function
      const promise = Q.allResolved([Q(1), Q(2)]);

      // Return the promise to wait for completion
      return promise.then(() => {
        // The original code should have logged a warning
        // The mutated code won't log anything
        expect(warnings.length).toBeGreaterThan(0);

        // Check that the warning contains expected text
        const warningText = warnings[0][0];
        expect(typeof warningText).toBe('string');
        expect(warningText).toContain('allResolved');
        expect(warningText).toContain('deprecated');
        expect(warningText).toContain('allSettled');
      });
    } finally {
      console.warn = originalWarn;
    }
  });
});