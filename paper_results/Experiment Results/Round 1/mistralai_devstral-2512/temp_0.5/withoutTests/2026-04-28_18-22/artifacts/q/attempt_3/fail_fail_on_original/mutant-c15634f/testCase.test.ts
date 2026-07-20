// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c15634f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should not call console.warn when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-expect-error - We are intentionally deleting console for this test
    delete global.console;

    const callback = jest.fn();
    const deprecatedFunc = Q.deprecate(callback, "testFunc", "use newFunc instead");

    deprecatedFunc();

    expect(callback).toHaveBeenCalled();

    global.console = originalConsole;
  });
});