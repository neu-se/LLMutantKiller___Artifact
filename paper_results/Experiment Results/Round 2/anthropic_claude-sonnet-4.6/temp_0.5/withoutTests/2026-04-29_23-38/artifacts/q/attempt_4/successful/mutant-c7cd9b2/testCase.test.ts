import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as path from "path";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should parse anonymous stack frames with single-digit column numbers and filter them", async () => {
    Q.longStackSupport = true;

    // Get Q's absolute file path using CommonJS require (available in Jest)
    const qFilePath: string = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Construct an error whose stack contains an anonymous Q-internal frame
    // matching attempt2 format: "at /abs/path/q.js:LINE:SINGLE_DIGIT_COL"
    // Line 500 is within Q's internal line range [qStartingLine, qEndingLine]
    const testError = new Error("test");
    const anonymousQFrame = `    at ${qFilePath}:500:5`;
    Object.defineProperty(testError, "stack", {
      value: `Error: test\n    at Object.<anonymous> (test.ts:1:1)\n${anonymousQFrame}`,
      configurable: true,
      writable: true,
    });

    const deferred = Q.defer();
    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      deferred.promise.then(null, (err: Error) => {
        capturedError = err;
        resolve();
      });
      deferred.reject(testError);
    });

    expect(capturedError).not.toBeNull();
    const finalStack = capturedError!.stack || "";

    // Original code: attempt2 correctly parses the anonymous Q frame,
    // isInternalFrame returns true, and the frame is filtered out.
    // Mutated code: attempt2 is if(false), getFileNameAndLineNumber returns
    // undefined, isInternalFrame returns false, the frame stays in the stack.
    expect(finalStack).not.toContain(`at ${qFilePath}:500:5`);
  });
});