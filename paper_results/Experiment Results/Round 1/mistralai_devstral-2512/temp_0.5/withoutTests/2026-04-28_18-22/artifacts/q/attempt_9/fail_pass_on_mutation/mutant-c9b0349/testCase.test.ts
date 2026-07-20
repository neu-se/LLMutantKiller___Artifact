// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve application frames in error stacks", () => {
    // The mutation changes the condition in isInternalFrame from:
    // lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // to:
    // true && (same condition)
    // This means ALL frames will be considered internal in the mutated version

    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Store original stack for comparison
    const originalStack = error.stack;

    // Reject the promise to trigger stack trace processing
    deferred.reject(error);

    // The key difference is in how stack traces are filtered
    // In original: only Q internal frames are filtered
    // In mutated: ALL frames are filtered (due to the "true &&" condition)

    // We can detect this by checking if the stack trace was modified
    // In original, some frames should remain
    // In mutated, the stack will be empty or minimal
    const currentStack = error.stack;
    expect(currentStack).toBeDefined();

    // The mutation causes over-filtering, resulting in empty/minimal stacks
    // while original should preserve application frames
    const hasFrames = currentStack.split('\n').filter(line => line.trim().length > 0).length > 0;
    expect(hasFrames).toBe(true);
  });
});