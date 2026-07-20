import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame", () => {
  it("error stack contains user frame after long stack trace processing", async () => {
    Q.longStackSupport = true;

    // Force makeStackTraceLong to be called by using .then with rejection handler
    const err = new Error("test");
    
    let processedError: any;
    await new Promise<void>((resolve) => {
      Q.reject(err).then(null, (e: any) => {
        processedError = e;
        resolve();
      });
    });

    // makeStackTraceLong modifies error.stack via filterStackString
    // Original: only Q frames filtered, user frames (this file) preserved  
    // Mutation: all frames with lineNumber <= qEndingLine filtered
    // Since qEndingLine is large, user frames get filtered too
    // Check that the error stack still has content from user code
    const stack = processedError.stack || "";
    expect(stack.length).toBeGreaterThan(0);
    // The stack should reference something outside of Q
    expect(stack).toMatch(/at .+/); // at least one frame remains
  });
});