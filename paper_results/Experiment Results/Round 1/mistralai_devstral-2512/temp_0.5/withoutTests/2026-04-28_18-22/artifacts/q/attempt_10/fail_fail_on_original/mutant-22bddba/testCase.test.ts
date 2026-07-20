// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_10/pending_category/mutant-22bddba/testCase.test.ts
describe("Q library environment detection", () => {
  it("should attach to window when window is defined but self is not", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Clear globals
    delete globalAny.window;
    delete globalAny.self;

    try {
      // Set up environment with window but no self
      globalAny.window = {};

      // Clear the require cache to force reloading
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Load Q - original code should attach to window
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be attached to window
      // In mutated code, this would fail because it checks false || typeof self
      expect(globalAny.window.Q).toBeDefined();
      expect(globalAny.window.Q).toBe(qModule);

      // Verify functionality
      return globalAny.window.Q.resolve(42).then((value: number) => {
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