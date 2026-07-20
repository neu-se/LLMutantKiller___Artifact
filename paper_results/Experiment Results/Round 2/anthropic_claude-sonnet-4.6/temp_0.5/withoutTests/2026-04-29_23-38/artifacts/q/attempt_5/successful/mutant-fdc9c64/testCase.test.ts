import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("should not filter frames from non-Q files based on line number alone", async () => {
    Q.longStackSupport = true;

    // Create an error with a manually crafted stack
    // The stack starts with a frame line (no message line) to avoid crashes
    // The frame has a small line number that would be filtered by the mutation
    const err = new Error("test");
    
    // We'll check if the error's stack is modified by makeStackTraceLong
    // by looking at whether it contains the "From previous event:" separator
    
    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      const d = Q.defer<void>();
      d.promise.then(null, function(e: Error) {
        capturedError = e;
        resolve();
      });
      d.reject(err);
    });

    expect(capturedError).not.toBeNull();
    
    // If makeStackTraceLong ran, the stack should contain "From previous event:"
    // This proves the filtering happened
    const stack = (capturedError as Error).stack!;
    expect(stack).toContain("From previous event:");
    
    // Now check that the stack contains frames from THIS file
    // Original: test file frames preserved (fileName !== qFileName)
    // Mutated: test file frames filtered (lineNumber <= qEndingLine)
    const frameLines = stack.split("\n").filter(l => /\s+at\s/.test(l));
    const thisFileFrames = frameLines.filter(l => l.includes("testCase.test"));
    expect(thisFileFrames.length).toBeGreaterThan(0);

    Q.longStackSupport = false;
  });
});