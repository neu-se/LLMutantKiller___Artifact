// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_3/pending_category/mutant-c15634f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deprecation warning", () => {
  it("should not throw when console.warn is not a function", () => {
    const originalConsole = global.console;
    global.console = { warn: null };

    try {
      // This should not throw even when console.warn is not a function
      Q.defer();
      expect(true).toBe(true);
    } finally {
      global.console = originalConsole;
    }
  });
});