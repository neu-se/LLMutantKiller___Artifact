describe("Q library environment detection", () => {
  it("should correctly handle browser environment detection", () => {
    // Test the actual condition that was mutated
    // Original: } else if (typeof window !== "undefined" || typeof self !== "undefined") {
    // Mutated:  } else if (false) {

    // Create a mock browser environment
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Set up browser-like environment
      globalAny.window = {};
      globalAny.self = {};

      // Clear any cached module
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // This should work in original code but throw in mutated code
      // because the mutation changes the condition to always false
      // which would cause it to throw "This environment was not anticipated by Q"
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // If we get here, the environment was recognized
      expect(Q).toBeDefined();
      expect(typeof Q).toBe("function");
    } finally {
      // Cleanup
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});