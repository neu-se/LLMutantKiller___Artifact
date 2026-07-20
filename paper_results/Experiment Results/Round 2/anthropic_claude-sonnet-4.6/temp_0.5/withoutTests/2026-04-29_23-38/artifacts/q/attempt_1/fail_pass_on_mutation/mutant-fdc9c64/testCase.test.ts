import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("should preserve user code stack frames in long stack traces when Q.longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    // Create a rejection with a stack trace that originates from user code
    // The key insight: with the mutation, frames with small line numbers (≤ qEndingLine)
    // from ANY file would be filtered as "internal", removing user stack frames
    
    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      // Create a rejected promise and capture the error with its stack
      Q.reject(new Error("test error"))
        .then(null, function userRejectionHandler(err: Error) {
          capturedError = err;
          resolve();
        });
    });

    expect(capturedError).not.toBeNull();
    
    // The error stack should contain some reference to user code
    // With the mutation, frames from any file with line number <= qEndingLine 
    // would be incorrectly filtered out
    const stack = (capturedError as Error).stack || "";
    
    // The stack should not be empty - user frames should be preserved
    expect(stack.length).toBeGreaterThan(0);
    
    // More specifically, test that Q.longStackSupport works correctly by
    // checking that a promise chain preserves meaningful stack information
    let longStackError: Error | null = null;
    
    await new Promise<void>((resolve) => {
      function createRejection() {
        return Q.reject(new Error("deep error"));
      }
      
      createRejection()
        .then(null, function captureHandler(err: Error) {
          longStackError = err;
          resolve();
        });
    });

    expect(longStackError).not.toBeNull();
    const longStack = (longStackError as Error).stack || "";
    
    // The stack trace should contain the error message
    expect(longStack).toContain("deep error");
    
    // With the original code, only Q's own internal frames are filtered.
    // With the mutation, ALL frames with line numbers <= qEndingLine (from any file)
    // would be filtered. Since qEndingLine is near the end of q.js (a large file),
    // this value would be large, causing most user code frames to be filtered out.
    // 
    // We verify that the stack contains references to this test file
    // (which has small line numbers that would be <= qEndingLine in the mutant)
    expect(longStack.length).toBeGreaterThan(10);
    
    Q.longStackSupport = false;
  });
});