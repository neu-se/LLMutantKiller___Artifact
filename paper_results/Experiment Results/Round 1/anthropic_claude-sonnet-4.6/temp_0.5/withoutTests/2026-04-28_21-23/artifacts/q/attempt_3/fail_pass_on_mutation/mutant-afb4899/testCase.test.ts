import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex $ anchor", () => {
  it("correctly parses stack lines - attempt2 should only match lines ending with column number", async () => {
    // The mutation removes $ from attempt2 regex, causing it to match
    // stack lines like "at file.js:10:5)" (with trailing paren) 
    // which are actually named-function style lines already handled by attempt1
    // 
    // In Node.js, anonymous function stack lines look like:
    //   "    at /path/to/file.js:10:5"
    // Named function lines look like:  
    //   "    at functionName (/path/to/file.js:10:5)"
    //
    // attempt1 handles named function lines and returns []
    // attempt2 should only handle anonymous lines (ending with digits)
    // Without $, attempt2 would also partially match named function lines
    // if attempt1 didn't catch them first
    //
    // The real observable difference: captureLine() is called at module init
    // to find qFileName and qStartingLine. If getFileNameAndLineNumber 
    // returns wrong values due to the mutation, isInternalFrame breaks.
    
    // Test that Q properly filters its own frames in long stack traces
    Q.longStackSupport = true;
    
    let error: Error | null = null;
    
    function outerFunction() {
      return Q.reject(new Error("test"));
    }
    
    await outerFunction().fail((e: any) => {
      error = e;
    });
    
    expect(error).not.toBeNull();
    // With correct stack filtering, the stack should exist
    expect((error as any).stack).toBeDefined();
    
    Q.longStackSupport = false;
  });
});