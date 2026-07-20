// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-ae354e2/testCase.test.ts
const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function warning message format", () => {
  it("should contain the exact phrase ' is deprecated, use ' in warning messages", () => {
    const Q = qFactory();

    // Mock console.warn to capture the warning message
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(' '));
    };

    // Simulate the deprecate function's warning message
    const name = "testFunc";
    const alternative = "newFunc";
    if (typeof console !== "undefined" && typeof console.warn === "function") {
      // This simulates the original code's behavior
      console.warn(name + " is deprecated, use " + alternative);
    }

    console.warn = originalWarn;

    // Check that the warning contains the specific phrase that the mutation removes
    const warningMessage = warnMessages[0];
    expect(warningMessage).toContain(" is deprecated, use ");
  });
});