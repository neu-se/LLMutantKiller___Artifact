import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("filters Q internal frames from long stack traces by correctly parsing multi-digit line numbers", async () => {
    Q.longStackSupport = true;
    
    let capturedError: any = null;
    
    await new Promise<void>((resolve) => {
      Q.reject(new Error("test error"))
        .then(null, null)
        .then(null, (err: any) => {
          capturedError = err;
          resolve();
        });
    });
    
    const stack: string = capturedError?.stack ?? "";
    
    // The promise's stack (captured in defer()) contains Q internal frames
    // like "at defer (q.js:LINE)" and "at Promise.then (q.js:LINE)"
    //
    // With original regex (\d+): these frames are correctly identified as internal
    // and filtered out by filterStackString/isInternalFrame
    //
    // With mutated regex (\d): getFileNameAndLineNumber fails to parse lines
    // with multi-digit line numbers (all real lines), so isInternalFrame
    // always returns false, and Q internal frames are NOT filtered
    
    // Check that Q internal frames are filtered (original) vs not (mutated)
    const hasQInternalFrames = stack.split("\n").some(line => 
      line.includes("q.js") && (
        line.includes("at defer") || 
        line.includes("at Promise.then") ||
        line.includes("at reject")
      )
    );
    
    // Original: filtered → false
    // Mutated: not filtered → true
    expect(hasQInternalFrames).toBe(false);
  });
});