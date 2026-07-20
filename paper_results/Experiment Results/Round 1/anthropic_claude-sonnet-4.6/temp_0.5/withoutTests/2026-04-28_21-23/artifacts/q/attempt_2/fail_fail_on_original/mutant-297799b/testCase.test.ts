import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("makeStackTraceLong should filter stack to only node frames, resulting in empty stack for test code", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));
    
    let capturedError: any;
    await new Promise<void>((resolve) => {
      deferred.promise.then(null, (err: any) => {
        capturedError = err;
        resolve();
      });
    });
    
    // After makeStackTraceLong processes the error, the stack is filtered
    // Original: only (module.js: or (node.js: lines kept → stack is empty for test code
    // Mutation (return true): all non-internal lines kept → stack has test frames
    const stack: string = capturedError.stack || "";
    const atLines = stack.split("\n").filter((l: string) => l.trim().startsWith("at "));
    // With original code, all "at" lines from test code are filtered out
    // With mutation, test code lines remain
    expect(atLines.length).toBe(0);
  });
});