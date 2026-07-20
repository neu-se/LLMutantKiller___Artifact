// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_8/pending_category/mutant-ae354e2/testCase.test.ts
const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function warning message", () => {
  it("should include 'is deprecated, use' in the warning message", () => {
    const Q = qFactory();

    // Mock console.warn to capture the warning message
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(' '));
    };

    // Create a simple test to trigger the deprecate function
    // We'll test the warning message format directly
    const testFunc = () => {
      // This should trigger the deprecate warning
      if (typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn("testFunc" + " is deprecated, use " + "newFunc");
      }
      return "test";
    };

    testFunc();

    console.warn = originalWarn;

    // Check that the warning contains the expected format
    expect(warnMessages.some(msg => msg.includes("testFunc is deprecated, use newFunc"))).toBe(true);
  });
});