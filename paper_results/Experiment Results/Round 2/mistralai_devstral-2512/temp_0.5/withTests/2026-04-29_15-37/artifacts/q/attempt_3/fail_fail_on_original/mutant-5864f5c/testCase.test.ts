// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-5864f5c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };
    const normalError = new Error("normal error");

    // Test that isStopIteration returns true for StopIteration
    expect(Q.isStopIteration(stopIteration)).toBe(true);

    // Test that isStopIteration returns false for normal errors
    expect(Q.isStopIteration(normalError)).toBe(false);

    // Test that isStopIteration returns true for QReturnValue instances
    const returnValue = new (Q as any).QReturnValue("test");
    expect(Q.isStopIteration(returnValue)).toBe(true);
  });
});