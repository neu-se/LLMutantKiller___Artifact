// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library deprecation warnings", () => {
  it("should log deprecation warnings for deprecated methods", () => {
    // Mock console.warn to capture warnings
    const originalWarn = console.warn;
    const warnings: any[] = [];
    console.warn = (...args: any[]) => {
      warnings.push(args);
    };

    try {
      // Test using Q.allResolved which is deprecated in favor of Q.allSettled
      const promise1 = Q.resolve(1);
      const promise2 = Q.resolve(2);

      // Use the deprecated allResolved method
      const resultPromise = Q.allResolved([promise1, promise2]);

      return resultPromise.then((results) => {
        // Verify the functionality works
        expect(results.length).toBe(2);
        expect(results[0].value).toBe(1);
        expect(results[1].value).toBe(2);

        // In the original code, we should have deprecation warnings
        // In the mutated code, warnings array should be empty
        expect(warnings.length).toBeGreaterThan(0);

        // Check that the warning contains expected content
        const warning = warnings.find(w => w[0].includes("allResolved"));
        expect(warning).toBeDefined();
        expect(warning[0]).toContain("deprecated");
        expect(warning[0]).toContain("allSettled");

        // Check that stack trace was included
        expect(warning[1]).toBeTruthy();
      });
    } finally {
      console.warn = originalWarn;
    }
  });
});