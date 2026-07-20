// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-22bddba/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global export", () => {
  it("should expose Q as a global when loaded in a browser-like environment with only self defined", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Clear both window and self to simulate the environment
    delete globalAny.window;
    delete globalAny.self;

    try {
      // Create only self object (no window)
      globalAny.self = {};

      // Load Q in this environment
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q is attached to self when window is undefined
      expect(globalAny.self.Q).toBeDefined();
      expect(typeof globalAny.self.Q).toBe("function");

      // Verify basic functionality works
      const promise = globalAny.self.Q.resolve(42);
      return promise.then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original globals
      if (originalWindow !== undefined) {
        globalAny.window = originalWindow;
      } else {
        delete globalAny.window;
      }

      if (originalSelf !== undefined) {
        globalAny.self = originalSelf;
      } else {
        delete globalAny.self;
      }
    }
  });
});