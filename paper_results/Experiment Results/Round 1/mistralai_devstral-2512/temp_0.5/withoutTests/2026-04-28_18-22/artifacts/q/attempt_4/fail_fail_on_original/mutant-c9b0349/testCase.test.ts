// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should preserve application frames in stack traces", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Add a handler to capture the stack trace
    let capturedError: Error | undefined;
    promise.catch((e: Error) => {
      capturedError = e;
    });

    // The mutation changes the condition from checking line numbers to always true
    // This causes ALL frames to be filtered (including application frames)
    // while original should only filter Q internal frames

    // Verify we captured an error
    expect(capturedError).toBeDefined();
    expect(capturedError!.stack).toBeDefined();

    // In original code, stack should contain application frames
    // In mutated code, stack will be empty/minimal due to over-filtering
    const stackLines = capturedError!.stack.split('\n');
    const hasApplicationFrames = stackLines.some(line =>
      line.includes("testCase.test.ts") || (line.includes("at ") && !line.includes("(q.js"))
    );

    expect(hasApplicationFrames).toBe(true);
  });
});