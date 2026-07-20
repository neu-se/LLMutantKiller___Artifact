import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack trace filtering", () => {
  it("filters internal Q frames from error stacks when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: any = null;
    
    // Create a deep promise chain that rejects
    // makeStackTraceLong will be called, which calls filterStackString
    // filterStackString calls isInternalFrame for each line
    // isInternalFrame calls getFileNameAndLineNumber
    // With mutation: lines with multi-digit line numbers won't be parsed
    // so Q's own frames (at lines > 9) won't be recognized as internal
    // and won't be filtered out
    
    const p = Q.reject(new Error("deep error"))
      .then(() => {})
      .then(() => {})
      .fail((e: Error) => { throw e; });
    
    try {
      await p;
    } catch(e) {
      capturedError = e;
    }
    
    expect(capturedError).not.toBeNull();
    expect(capturedError.message).toBe("deep error");
    
    // With original: Q internal frames filtered, stack is shorter/cleaner
    // With mutation: Q internal frames NOT filtered (qStartingLine=undefined)
    // 
    // We can check: does the stack contain "q.js" references?
    // Original: q.js frames filtered out
    // Mutated: q.js frames remain
    
    const stack = capturedError.stack as string;
    expect(stack).toBeDefined();
    
    // In original code, Q's internal frames are filtered from the stack
    // In mutated code, they are not filtered (because isInternalFrame fails)
    // So in mutated code, the stack would contain references to q.js internals
    // This is the observable difference
    
    // Count q.js references - original should have fewer
    const qFrameCount = (stack.match(/q\.js/g) || []).length;
    
    // In original: internal Q frames are filtered, so qFrameCount should be 0 or very low
    // In mutated: internal Q frames are NOT filtered, so qFrameCount > 0
    expect(qFrameCount).toBe(0);
    
    Q.longStackSupport = false;
  });
});