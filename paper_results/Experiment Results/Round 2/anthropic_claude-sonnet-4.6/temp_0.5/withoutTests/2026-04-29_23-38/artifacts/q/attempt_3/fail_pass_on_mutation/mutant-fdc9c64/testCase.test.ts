import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame operator precedence", () => {
  it("should only filter q.js internal frames, not frames from other files with small line numbers", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    // Create a deferred and reject it - the deferred's stack will be captured
    // and used in makeStackTraceLong when the rejection propagates
    await new Promise<void>((resolve) => {
      const deferred = Q.defer<void>();
      
      deferred.promise.then(null, function onRejected(err: Error) {
        capturedError = err;
        resolve();
      });
      
      deferred.reject(new Error("rejection reason"));
    });

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack!;

    // The filtered stack should contain at least one frame from a non-Q file
    // (the test file itself, which has small line numbers)
    //
    // With original isInternalFrame:
    //   return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    //   → only q.js frames filtered → test file frames PRESERVED
    //
    // With mutated isInternalFrame:
    //   return (fileName === qFileName && lineNumber >= qStartingLine) || lineNumber <= qEndingLine
    //   → any frame with lineNumber <= ~1800 filtered → test file frames REMOVED
    
    const frameLines = stack.split("\n").filter(line => /\s+at\s/.test(line));
    const nonQFrames = frameLines.filter(line => 
      !line.includes("q.js") && 
      !line.includes("node:") && 
      !line.includes("(internal/")
    );
    
    expect(nonQFrames.length).toBeGreaterThan(0);

    Q.longStackSupport = false;
  });
});