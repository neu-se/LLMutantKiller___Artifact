// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_6/pending_category/mutant-22bddba/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global export", () => {
  it("should export Q to window global in browser environment with window but without self", () => {
    // Store original global state
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Setup environment: window exists, self does not
      globalAny.window = {};
      delete globalAny.self;
      delete globalAny.Q;

      // Clear module cache and reload Q
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      require(modulePath);

      // In original code, Q should be exported to window
      // In mutated code, the condition `false || typeof self !== "undefined"`
      // will fail when self doesn't exist, so Q won't be exported
      expect(globalAny.window.Q).toBeDefined();
      expect(typeof globalAny.window.Q).toBe('function');
    } finally {
      // Restore original global state
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});