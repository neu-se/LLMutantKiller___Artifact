import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("correctly parses named function frames enabling Q internal frame filtering in long stacks", async () => {
    Q.longStackSupport = true;
    
    let capturedError: Error | null = null;
    
    await Q.fcall(function() {
      throw new Error("test error");
    }).then(null, function(e: Error) {
      capturedError = e;
    });
    
    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";
    
    // makeStackTraceLong should have been called, adding the separator
    expect(stack).toContain("From previous event:");
    
    // Original: getFileNameAndLineNumber correctly parses named function frames,
    // enabling isInternalFrame to identify Q's "defer" function as internal,
    // so it gets filtered out of the long stack trace.
    //
    // Mutated: getFileNameAndLineNumber returns [] → isInternalFrame always false
    // → "defer" is NOT filtered → it appears in the stack
    expect(stack).not.toContain("at defer");
  });
});