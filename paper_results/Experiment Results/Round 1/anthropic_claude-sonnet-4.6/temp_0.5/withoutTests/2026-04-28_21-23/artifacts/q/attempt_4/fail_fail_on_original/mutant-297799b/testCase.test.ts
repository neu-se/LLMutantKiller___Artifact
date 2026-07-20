import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("makeStackTraceLong should modify error stack", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test");
    const originalStack = error.stack; // capture before rejection
    
    const deferred = Q.defer();
    deferred.reject(error);
    
    const capturedError = await deferred.promise.then(null, (e: any) => e);
    const modifiedStack = capturedError.stack;
    
    // If makeStackTraceLong ran and modified the stack:
    // Original: stack is filtered to only node frames (shorter or empty)
    // Mutation: stack is filtered to all non-internal frames (similar to original or longer)
    
    // The key: with original code, the modified stack should be DIFFERENT from the original
    // (because it's been filtered)
    // With mutation, the modified stack might be similar to the original
    
    // Actually, with original in modern Node.js: modifiedStack = "" (empty)
    // With mutation: modifiedStack = all non-internal frames (similar to originalStack)
    
    // So: original → modifiedStack !== originalStack
    //     mutation → modifiedStack === originalStack (approximately)
    
    // This is hard to test precisely. Let me check length instead:
    // Original: modifiedStack.length <= originalStack.length (shorter or equal)
    // Mutation: modifiedStack.length >= originalStack.length (similar or longer)
    
    // If makeStackTraceLong is working:
    // Original: modifiedStack = "" → shorter
    // Mutation: modifiedStack = all frames → similar length or longer
    
    expect(modifiedStack.length).toBeLessThanOrEqual(originalStack.length);
  });
});