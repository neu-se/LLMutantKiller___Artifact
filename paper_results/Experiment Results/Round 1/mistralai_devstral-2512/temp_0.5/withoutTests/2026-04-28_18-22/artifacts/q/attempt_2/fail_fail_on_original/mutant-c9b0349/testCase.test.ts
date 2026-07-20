// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // Create a rejected promise with long stack traces enabled
    Q.longStackSupport = true;
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Add a handler to trigger stack trace processing
    let caughtError: any;
    promise.catch((e: any) => {
      caughtError = e;
    });

    // The mutation changes the condition from checking line numbers to always true
    // This means in the mutated version, ALL frames will be filtered (including application frames)
    // while in the original version, only Q internal frames should be filtered
    expect(caughtError).toBeDefined();
    expect(caughtError.stack).toBeDefined();

    // In the original code, the stack should contain some frames
    // In the mutated code, the stack will be empty or minimal due to over-filtering
    const stackLines = caughtError.stack.split('\n').filter((line: string) => line.trim().length > 0);
    expect(stackLines.length).toBeGreaterThan(1);
  });
});