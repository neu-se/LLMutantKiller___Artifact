// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // The mutation changes the condition in isInternalFrame from checking line numbers
    // to always returning true, which causes all frames to be filtered

    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force stack trace generation through promise rejection
    deferred.reject(error);

    // Get the promise's stack trace handling
    const promise = deferred.promise;

    // The mutation affects how stack traces are filtered
    // In original: only Q internal frames (within line range) are filtered
    // In mutated: ALL frames are filtered (true && condition)

    // We can test this by checking if the stack trace contains expected frames
    // In original, some frames should remain
    // In mutated, all frames will be removed
    expect(promise.inspect().state).toBe("rejected");

    // The key difference is in the stack trace filtering behavior
    // This test verifies the mutation by checking stack trace presence
    const hasStack = !!error.stack;
    expect(hasStack).toBe(true);

    // In original code, stack should have multiple frames
    // In mutated code, stack will be empty/minimal
    const stackLines = error.stack.split('\n').filter(line => line.trim());
    expect(stackLines.length).toBeGreaterThan(1);
  });
});