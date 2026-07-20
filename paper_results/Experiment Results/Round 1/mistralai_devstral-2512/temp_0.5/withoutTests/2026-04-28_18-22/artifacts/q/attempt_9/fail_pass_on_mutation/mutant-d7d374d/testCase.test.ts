// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-d7d374d/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deprecate console check", () => {
  it("should not throw when console is undefined during deprecation", () => {
    const originalConsole = global.console;
    // @ts-ignore
    delete global.console;

    try {
      // Force the deprecate function to be called by using a deprecated method
      // Q.makePromise is deprecated in favor of Q.Promise
      const promise = Q.makePromise({
        "when": function() {
          return "test value";
        }
      });

      return promise.then(value => {
        expect(value).toBe("test value");
      });
    } finally {
      global.console = originalConsole;
    }
  });
});