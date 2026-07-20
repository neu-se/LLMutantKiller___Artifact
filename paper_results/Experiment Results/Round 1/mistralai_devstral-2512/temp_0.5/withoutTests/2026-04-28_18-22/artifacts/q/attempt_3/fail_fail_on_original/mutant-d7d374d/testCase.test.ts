// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-d7d374d/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function console check", () => {
  it("should not throw when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-ignore
    delete global.console;

    try {
      const deprecatedFn = Q.deprecate(() => "test", "testFn", "newFn");
      const result = deprecatedFn();
      expect(result).toBe("test");
    } finally {
      global.console = originalConsole;
    }
  });
});