import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt2 parsing", () => {
  it("should filter anonymous Q frames with single-digit column numbers", async () => {
    Q.longStackSupport = true;
    
    // Create a deferred to get Q's file path from the promise stack
    const helperDeferred = Q.defer();
    const promiseStack: string = (helperDeferred.promise as any).stack || "";
    
    // Extract Q's file path from "    at defer (/path/to/q.js:LINE:COL)"
    const pathMatch = /at defer \((.+):\d+:\d+\)/.exec(promiseStack);
    if (!pathMatch) {
      // If we can't get the path, we can't run this test
      throw new Error("Cannot determine Q file path from stack trace");
    }
    const qFilePath = pathMatch[1];
    
    // Create an error with a custom stack containing an anonymous Q internal frame
    // in attempt2 format: "at /path/to/q.js:LINE:SINGLE_DIGIT_COL"
    // This is the format that attempt2 is designed to parse.
    const testError = new Error("test error");
    const anonymousQFrame = `    at ${qFilePath}:500:5`;
    Object.defineProperty(testError, 'stack', {
      value: `Error: test error\n    at Object.<anonymous> (test.ts:10:5)\n${anonymousQFrame}`,
      configurable: true,
      writable: true
    });
    
    // Process the error through Q's rejection machinery
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
    
    // With original code: attempt2 parses the anonymous Q frame, isInternalFrame
    // returns true, and the frame is filtered from the stack.
    // With mutation: attempt2 is disabled, getFileNameAndLineNumber returns undefined,
    // isInternalFrame returns false, and the frame remains in the stack.
    expect(finalStack).not.toContain(`at ${qFilePath}:500:5`);
  });
});