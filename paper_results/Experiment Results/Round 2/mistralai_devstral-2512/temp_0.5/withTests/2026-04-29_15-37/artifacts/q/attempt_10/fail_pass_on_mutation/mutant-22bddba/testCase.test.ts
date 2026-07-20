// Test case to detect the mutation in q.js
describe("Q library initialization", () => {
  it("should load correctly in browser-like environment with window", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Test 1: Setup browser-like environment with window but no self
      globalAny.window = {};
      delete globalAny.self;

      // Clear the module cache to force fresh load
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Load Q - this should work in original code
      const Q1 = require(modulePath);
      expect(Q1).toBeDefined();
      expect(typeof Q1.defer).toBe('function');

      // Test 2: Setup environment with self but no window
      delete globalAny.window;
      globalAny.self = {};

      // Clear cache again
      delete require.cache[modulePath];

      // Load Q - this should also work in original code
      const Q2 = require(modulePath);
      expect(Q2).toBeDefined();
      expect(typeof Q2.defer).toBe('function');

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});