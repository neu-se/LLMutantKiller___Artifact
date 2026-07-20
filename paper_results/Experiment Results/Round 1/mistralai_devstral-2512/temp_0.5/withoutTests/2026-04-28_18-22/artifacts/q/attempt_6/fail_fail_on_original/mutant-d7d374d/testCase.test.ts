// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-d7d374d/testCase.test.ts
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function console check", () => {
  it("should not throw when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-ignore
    delete global.console;

    try {
      // Access the deprecate function from the module's internal scope
      const deprecateFn = qModule.Q.deprecate || qModule.deprecate;
      if (typeof deprecateFn !== 'function') {
        throw new Error("deprecate function not found");
      }
      const deprecatedFn = deprecateFn(() => "test", "testFn", "newFn");
      const result = deprecatedFn();
      expect(result).toBe("test");
    } finally {
      global.console = originalConsole;
    }
  });
});