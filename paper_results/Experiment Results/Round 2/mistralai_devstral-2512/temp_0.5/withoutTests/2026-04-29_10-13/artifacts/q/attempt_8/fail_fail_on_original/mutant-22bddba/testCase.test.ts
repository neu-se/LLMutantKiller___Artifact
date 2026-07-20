// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_9/pending_category/mutant-22bddba/testCase.test.ts
describe("Q library global export", () => {
  it("should export Q to window when window exists but self does not", () => {
    // Store original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Setup environment: window exists, self does not
      globalAny.window = {};
      delete globalAny.self;
      delete globalAny.Q;

      // Clear module cache to force fresh load
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Load Q - this should trigger the global export logic
      const Q = require(modulePath);

      // In original code: window exists → condition true → Q exported to window
      // In mutated code: false || (self doesn't exist) → condition false → no export
      expect(globalAny.window.Q).toBeDefined();
      expect(globalAny.window.Q).toBe(Q);
    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});