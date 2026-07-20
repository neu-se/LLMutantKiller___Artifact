import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame stack filtering", () => {
  it("should not filter out stack frames from external files with small line numbers", async () => {
    Q.longStackSupport = true;

    // Create a rejection at a known location in this test file (small line number)
    // The mutation would incorrectly filter frames from external files if lineNumber <= qEndingLine
    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      Q.reject(new Error("test error"))
        .then(null, function(err: Error) {
          capturedError = err;
          resolve();
        });
    });

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack || "";
    
    // The error message should be present in the stack
    expect(stack).toContain("test error");
    
    // With the mutation, filterStackString would remove lines from external files
    // that have small line numbers (because lineNumber <= qEndingLine is true for them)
    // We verify the stack is not empty (has meaningful content beyond just the error message)
    const lines = stack.split("\n").filter((line: string) => line.trim().length > 0);
    expect(lines.length).toBeGreaterThan(0);
    
    // The stack should contain at least one frame referencing this test file
    // With the mutation, frames from this file at small line numbers get filtered out
    const hasTestFileFrame = lines.some((line: string) => 
      line.includes("testCase.test") || line.includes("attempt_1")
    );
    
    // Reset
    Q.longStackSupport = false;
    
    // The test file frames should be present (not filtered)
    // With the original code: only q.js internal frames are filtered
    // With the mutation: any frame with lineNumber <= qEndingLine is filtered (including test frames)
    expect(hasTestFileFrame).toBe(true);
  });
});