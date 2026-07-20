describe("captureLine mutation", () => {
  it("should return early when hasStacks is false, not fall through to stack parsing", () => {
    // Save original Error
    const OriginalError = global.Error;
    
    // Make Error not produce stacks
    class NoStackError extends OriginalError {
      constructor(message?: string) {
        super(message);
        this.stack = undefined as any;
      }
    }
    global.Error = NoStackError as any;
    
    // Delete cached module to force re-initialization
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    let Q: any;
    let error: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      error = e;
    } finally {
      global.Error = OriginalError;
      // Clean up cache again
      delete require.cache[modulePath];
    }
    
    // Original: captureLine returns early when hasStacks=false, no error
    // Mutated: captureLine falls through, tries e.stack.split() on undefined, throws TypeError
    expect(error).toBeUndefined();
    expect(Q).toBeDefined();
  });
});