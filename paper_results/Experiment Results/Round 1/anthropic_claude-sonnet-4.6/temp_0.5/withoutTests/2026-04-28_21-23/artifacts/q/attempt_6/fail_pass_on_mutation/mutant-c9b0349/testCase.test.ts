import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame fileName check", () => {
  it("only filters frames from q.js, not from other files at same line numbers", async () => {
    Q.longStackSupport = true;
    
    try {
      // Create a deferred to get promise.stack (contains q.js frames)
      const probe = Q.defer();
      const rawStack = (probe.promise as any).stack as string;
      probe.resolve(null);
      
      if (!rawStack) {
        // hasStacks is false, skip test
        return;
      }
      
      // Find a q.js frame in the stack
      const lines = rawStack.split('\n');
      let qjsLineNumber: number | null = null;
      
      for (const line of lines) {
        // Match "at functionName (filename:lineNumber:colNumber)"
        const m = line.match(/at .+ \((.+):(\d+):\d+\)/);
        if (m) {
          qjsLineNumber = parseInt(m[2]);
          break;
        }
        // Match "at filename:lineNumber:colNumber"  
        const m2 = line.match(/at ([^ ]+):(\d+):\d+$/);
        if (m2) {
          qjsLineNumber = parseInt(m2[2]);
          break;
        }
      }
      
      if (qjsLineNumber === null) {
        return; // Can't parse stack
      }
      
      // Now create a deferred with a fake stack containing a frame from a DIFFERENT file
      // at the same line number as the q.js frame
      const deferred = Q.defer();
      const fakeStack = `    at Object.<anonymous> (/fake/other-file.js:${qjsLineNumber}:10)`;
      (deferred.promise as any).stack = fakeStack;
      (deferred.promise as any).stackCounter = 999;
      
      const error = new Error("test");
      deferred.reject(error);
      
      const caught = await deferred.promise.then(null, (e: Error) => e);
      
      // Original: fileName check → /fake/other-file.js !== q.js → NOT filtered → present in stack
      // Mutated: no fileName check → line number in range → IS filtered → NOT present in stack
      expect(caught.stack).toContain("other-file.js");
    } finally {
      Q.longStackSupport = false;
    }
  });
});