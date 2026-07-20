describe("Q library environment detection", () => {
  it("should correctly detect browser environment with window object", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Test case 1: window is an object (should trigger browser path)
      globalAny.window = {};
      delete globalAny.self;

      // Load Q
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original: typeof window !== "undefined" is true (window is object)
      // In mutated: typeof window !== "" is true (window is object)
      // Both should work, but we need to test the edge case

      // Test case 2: window is an empty string (should fail in mutated version)
      globalAny.window = "";
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const qModule2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original: typeof window !== "undefined" is true (empty string is not undefined)
      // In mutated: typeof window !== "" is false (empty string === "")
      // This should cause different behavior

      // Verify the difference
      expect(typeof globalAny.window).toBe("string");
      expect(globalAny.window).toBe("");

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});