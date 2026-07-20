import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("long stack traces contain user frames not Q internal frames", async () => {
    Q.longStackSupport = true;

    // Create deferred AFTER enabling longStackSupport so promise.stack gets set
    const deferred = Q.defer();
    
    let caughtError: any = null;

    const p = deferred.promise.then(null, function rejectionHandler(e: any) {
      caughtError = e;
    });

    // Reject with an error that has a stack
    const err = new Error("test rejection");
    deferred.reject(err);

    await p;

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    
    const stack: string = caughtError.stack || "";
    console.log("STACK:", stack);

    // makeStackTraceLong modifies error.stack via filterStackString
    // Original filterStackString: keeps !isInternalFrame lines (user code)
    // Mutated filterStackString: keeps isInternalFrame lines (Q internals only)
    
    // After makeStackTraceLong runs, the stack should contain the STACK_JUMP_SEPARATOR
    // if long stacks are working
    const hasLongStack = stack.includes("From previous event:");
    
    if (hasLongStack) {
      const lines = stack.split("\n").filter((l: string) => l.trim().length > 0 && l.includes("    at "));
      
      // With original: user frames present (from this test file), Q frames absent
      // With mutated: only Q internal frames present, user frames absent
      const testFileFrames = lines.filter((l: string) => l.includes("testCase.test"));
      const qInternalFrames = lines.filter((l: string) => /q\.js:\d+/.test(l));
      
      // Original passes: test frames exist
      // Mutated fails: test frames don't exist (only Q frames kept)
      expect(testFileFrames.length).toBeGreaterThan(0);
    } else {
      // If long stacks didn't activate, just pass - we can't test the mutation
      // But we should ensure long stacks ARE working
      expect(hasLongStack).toBe(true);
    }
  });
});