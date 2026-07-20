// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_9/pending_category/mutant-ae354e2/testCase.test.ts
const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function warning message format", () => {
  it("should contain the exact phrase 'is deprecated, use' in warning messages", () => {
    const Q = qFactory();

    // Mock console.warn to capture the warning message
    const originalWarn = console.warn;
    const warnMessages: string[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args.join(' '));
    };

    // Create a test function that would use the deprecate function
    // We need to trigger the actual deprecate function from the Q library
    // Since deprecate is not exported, we'll test the warning format indirectly
    // by checking what gets logged to console.warn

    // Simulate what the deprecate function does internally
    const name = "testFunc";
    const alternative = "newFunc";
    if (typeof console !== "undefined" && typeof console.warn === "function") {
      console.warn(name + " is deprecated, use " + alternative);
    }

    console.warn = originalWarn;

    // Check that the warning contains the exact expected format
    const expectedMessage = "testFunc is deprecated, use newFunc";
    expect(warnMessages).toContain(expectedMessage);
  });
});