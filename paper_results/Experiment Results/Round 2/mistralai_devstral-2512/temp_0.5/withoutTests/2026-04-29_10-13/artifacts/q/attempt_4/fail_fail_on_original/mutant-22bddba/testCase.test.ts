// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_4/pending_category/mutant-22bddba/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global export behavior", () => {
  it("should correctly detect browser-like environment with window object", () => {
    // Store original global state
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Setup environment: window exists, self does not
      globalAny.window = {};
      delete globalAny.self;

      // Clear module cache and reload Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be exported to window
      // In mutated code, it shouldn't (because of the false condition)
      expect(globalAny.window.Q).toBeDefined();
      expect(typeof globalAny.window.Q).toBe('function');
    } finally {
      // Restore original global state
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});