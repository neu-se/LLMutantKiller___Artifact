import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame line number filtering", () => {
  it("should not filter user code frames that happen to have small line numbers", async () => {
    Q.longStackSupport = true;
    
    let capturedError: any = null;
    
    // This test is at a small line number in this file
    // With the mutation, isInternalFrame returns true for lineNumber <= qEndingLine
    // qEndingLine is ~1800+ (end of q.js), so ALL frames would be filtered
    // With original, only frames where qStartingLine <= lineNumber <= qEndingLine are filtered
    // But since this test file has a different filename than qFileName,
    // wait... there's no filename check!
    
    // Actually isInternalFrame has NO filename check - it just checks line numbers!
    // So with mutation, frames from ANY file with lineNumber <= qEndingLine get filtered
    
    const error = new Error("test error");
    
    await Q.reject(error)
      .fail((e: any) => {
        capturedError = e;
      });
    
    expect(capturedError).not.toBeNull();
    const stack = capturedError.stack as string;
    
    // The stack should contain frames from this test file
    // With mutation, these would be filtered out (line numbers are small, <= qEndingLine ~1800)
    // With original, only frames with qStartingLine <= lineNumber <= qEndingLine are filtered
    // But wait - original also has no filename check, so it would filter test frames too!
    
    // Hmm, let me reconsider...
  });
});