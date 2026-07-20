// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_11/pending_category/mutant-22bddba/testCase.test.ts
describe("Q library environment detection", () => {
  it("should correctly identify browser-like environments", () => {
    // Store original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Setup environment: window exists, self does not
      globalAny.window = {};
      delete globalAny.self;

      // Clear module cache to force fresh evaluation
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Load Q - this should trigger the environment detection logic
      const Q = require(modulePath);

      // Test basic promise functionality to ensure Q loaded correctly
      return Q.resolve("test").then((result) => {
        expect(result).toBe("test");

        // The key test: in original code, Q should be exported to window
        // In mutated code, it shouldn't be exported (because of the false condition)
        if (typeof globalAny.window.Q !== 'undefined') {
          expect(globalAny.window.Q).toBe(Q);
        } else {
          // This branch should only execute in mutated version
          fail("Q was not exported to window global in browser-like environment");
        }
      });
    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});