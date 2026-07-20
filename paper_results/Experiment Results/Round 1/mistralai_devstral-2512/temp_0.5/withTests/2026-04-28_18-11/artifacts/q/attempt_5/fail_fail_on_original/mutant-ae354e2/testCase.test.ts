// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-ae354e2/testCase.test.ts
const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Q = qFactory();

describe("deprecate function warning message", () => {
  it("should include 'is deprecated, use' in the warning message", () => {
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(' '));
    };

    const callback = () => "test";
    const deprecatedFunc = Q.deprecate(callback, "oldFunc", "newFunc");
    deprecatedFunc();

    console.warn = originalWarn;

    expect(warnMessages.some(msg => msg.includes("oldFunc is deprecated, use newFunc"))).toBe(true);
  });
});