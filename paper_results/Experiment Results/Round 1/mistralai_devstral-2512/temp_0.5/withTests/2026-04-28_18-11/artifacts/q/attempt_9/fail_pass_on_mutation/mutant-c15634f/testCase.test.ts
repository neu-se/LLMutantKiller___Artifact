// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should handle missing console.warn gracefully", () => {
    // Save original console
    const originalConsole = console;

    // Remove console entirely to simulate environment without console
    (global as any).console = undefined;

    // This should not throw an error in original code (checks console.warn existence)
    // But will throw in mutated code (tries to access console.warn on undefined)
    expect(() => {
      const deferred = Q.defer();
      return deferred.promise;
    }).not.toThrow();

    // Restore console
    (global as any).console = originalConsole;
  });
});