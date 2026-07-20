// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c15634f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js").Q;

describe("deprecate function", () => {
  it("should not throw error when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-expect-error - We are intentionally deleting console for this test
    delete global.console;

    const callback = jest.fn();
    expect(() => {
      Q.deprecate(callback, "testFunc", "use newFunc instead");
    }).not.toThrow();

    global.console = originalConsole;
  });
});