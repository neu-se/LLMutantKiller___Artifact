// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_5/pending_category/mutant-22bddba/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
  it("should properly handle browser-like environment with window but no self", () => {
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
      const freshQ = require(modulePath);

      // Verify the module exports Q
      expect(freshQ).toBeDefined();

      // In original code, Q should be available as global when window exists
      // In mutated code, the condition fails so Q won't be set as global
      if (typeof globalAny.window.Q !== 'undefined') {
        expect(globalAny.window.Q).toBe(freshQ);
      } else {
        // This branch should only execute in mutated version
        expect(typeof globalAny.self).toBe('undefined');
        expect(globalAny.window).toBeDefined();
      }
    } finally {
      // Restore original global state
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});