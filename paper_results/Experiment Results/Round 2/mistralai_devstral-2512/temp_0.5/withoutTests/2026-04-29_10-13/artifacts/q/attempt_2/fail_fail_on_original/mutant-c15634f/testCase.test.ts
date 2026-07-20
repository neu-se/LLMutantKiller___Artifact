// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c15634f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deprecation warning", () => {
  it("should not throw when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-expect-error - intentionally deleting console for test
    delete global.console;

    try {
      // This should not throw even when console is undefined
      Q.defer();
      expect(true).toBe(true);
    } finally {
      global.console = originalConsole;
    }
  });
});