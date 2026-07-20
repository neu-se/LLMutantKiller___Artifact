import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("detects captureLine mutation via stack trace filtering", async () => {
    Q.longStackSupport = true;
    
    let capturedStack: string | undefined;
    
    // Create a deferred promise - its .stack will contain q.js frames
    const d = Q.defer();
    
    // The rejection handler will receive the error with potentially modified stack
    d.promise.then(undefined, function(err: Error) {
      capturedStack = err.stack;
    });
    
    // Reject with an error
    d.reject(new Error("mutation test"));
    
    // Wait for async processing
    await new Promise<void>(resolve => setTimeout(resolve, 200));
    
    // Verify we got the stack
    expect(capturedStack).toBeDefined();
    
    // Verify makeStackTraceLong was triggered (long stack trace created)
    expect(capturedStack).toContain("From previous event:");
    
    // In original: Q internal frames (from q.js) are filtered by filterStackString
    //              because qFileName is set to the q.js file path
    // In mutated:  qFileName is undefined, isInternalFrame always returns false,
    //              Q internal frames remain in the stack
    const stackLines = capturedStack!.split('\n');
    const qLibraryFrames = stackLines.filter(line => /q\.js:\d+/.test(line));
    
    // Original: filtered → 0 q.js frames
    // Mutated:  not filtered → at least 1 q.js frame (the defer() call)
    expect(qLibraryFrames.length).toBe(0);
    
    Q.longStackSupport = false;
  });
});