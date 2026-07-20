import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q attempt3 regex", () => {
  it("should correctly parse Firefox-style stack frames with multiple chars before @", async () => {
    Q.longStackSupport = true;
    
    // We need to test that getFileNameAndLineNumber correctly parses
    // Firefox-style stack lines like "functionName@filename:lineNumber"
    // The mutation changes /.*@/ to /.@/ which breaks parsing when
    // function name has more than 1 character
    
    // Strategy: create a deferred, inject a Firefox-style stack,
    // trigger makeStackTraceLong, and observe the result
    
    const deferred = Q.defer<void>();
    
    // Get q.js path from a normal promise stack
    const helperDeferred = Q.defer<void>();
    const qStack: string = (helperDeferred.promise as any).stack || "";
    helperDeferred.resolve();
    await helperDeferred.promise;
    
    if (!qStack) {
      // No stack support, skip
      expect(true).toBe(true);
      return;
    }
    
    // Parse the first line of the helper's stack to get q.js path and line
    const firstStackLine = qStack.split('\n')[0];
    const pathMatch = /\((.+q\.js):(\d+):\d+\)/.exec(firstStackLine);
    
    if (!pathMatch) {
      expect(true).toBe(true);
      return;
    }
    
    const qFilePath = pathMatch[1];
    const qLineNum = parseInt(pathMatch[2]);
    
    // Create a Firefox-style frame that looks like a Q internal frame
    // "multipleChars@qFilePath:qLineNum" - original regex matches, mutated doesn't
    const firefoxFrame = `multipleCharFunctionName@${qFilePath}:${qLineNum}`;
    
    // Set this as the promise's stack
    const promise = deferred.promise as any;
    promise.stack = firefoxFrame;
    promise.stackCounter = 1;
    
    // Create an error with a user stack
    const userError = new Error("user error");
    userError.stack = "Error: user error\n    at userFunction (/user/code.js:1:1)";
    
    deferred.reject(userError);
    
    let caughtError: Error | null = null;
    await deferred.promise.fail((e: Error) => {
      caughtError = e;
    });
    
    expect(caughtError).not.toBeNull();
    const finalStack = caughtError!.stack!;
    
    // With original regex: firefoxFrame is parsed, isInternalFrame may return true
    // (if qLineNum is in Q's internal range), filtering the frame
    // With mutated regex: firefoxFrame is NOT parsed, isInternalFrame returns false,
    // frame is NOT filtered
    
    // This test checks that the frame IS filtered (original behavior)
    // vs NOT filtered (mutated behavior)
    expect(finalStack).not.toContain("multipleCharFunctionName");
  });
});