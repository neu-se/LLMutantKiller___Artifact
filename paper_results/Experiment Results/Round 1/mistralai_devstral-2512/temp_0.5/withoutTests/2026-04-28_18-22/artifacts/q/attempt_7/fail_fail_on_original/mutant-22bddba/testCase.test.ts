// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_8/pending_category/mutant-22bddba/testCase.test.ts
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should handle environment where window exists but self doesn't", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    // Clear globals
    delete globalAny.window;
    delete globalAny.self;
    delete globalAny.Q;

    try {
      // Set up environment with window but no self
      globalAny.window = {};

      // Load Q - original code should attach to window
      // Mutated code would fail this case since it checks false || typeof self
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be attached to window
      expect(globalAny.window.Q).toBeDefined();
      expect(typeof globalAny.window.Q).toBe("function");
      expect(globalAny.window.Q).toBe(qModule);

      return globalAny.window.Q.resolve(42).then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original globals
      if (originalWindow !== undefined) globalAny.window = originalWindow;
      else delete globalAny.window;

      if (originalSelf !== undefined) globalAny.self = originalSelf;
      else delete globalAny.self;

      if (originalQ !== undefined) globalAny.Q = originalQ;
      else delete globalAny.Q;
    }
  });
});