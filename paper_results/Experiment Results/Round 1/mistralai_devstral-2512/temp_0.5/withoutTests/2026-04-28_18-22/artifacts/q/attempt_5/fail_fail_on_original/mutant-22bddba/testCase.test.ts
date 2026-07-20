// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_5/pending_category/mutant-22bddba/testCase.test.ts
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global export behavior", () => {
  it("should correctly handle environment detection for global export", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Clear window and self to simulate environment
    delete globalAny.window;
    delete globalAny.self;

    try {
      // Set up environment with only self defined (window undefined)
      globalAny.self = {};

      // Load Q - this should attach to self since window is undefined
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // The key test: Q should be attached to self when window is undefined
      // Original code: typeof window !== "undefined" || typeof self !== "undefined"
      // Mutated code: false || typeof self !== "undefined"
      // This test verifies the original behavior works correctly
      expect(globalAny.self.Q).toBeDefined();
      expect(typeof globalAny.self.Q).toBe("function");

      // Verify it's the same Q module
      expect(globalAny.self.Q).toBe(qModule);

      // Verify basic functionality
      return globalAny.self.Q.resolve(42).then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original globals
      if (originalWindow !== undefined) globalAny.window = originalWindow;
      else delete globalAny.window;

      if (originalSelf !== undefined) globalAny.self = originalSelf;
      else delete globalAny.self;
    }
  });
});