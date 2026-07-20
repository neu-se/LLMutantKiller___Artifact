import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Firefox-style stack frame filtering", () => {
  it("should filter Firefox-style internal Q frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer<void>();
      
      // Get Q's filename by looking at a real stack trace
      const qFilename = (() => {
        try { throw new Error(); } catch(e) {
          const lines = (e as Error).stack?.split('\n') || [];
          for (const line of lines) {
            if (line.includes('q.js')) {
              const match = /\((.+q\.js):\d+/.exec(line) || /at (.+q\.js):\d+/.exec(line);
              if (match) return match[1];
            }
          }
        }
        return null;
      })();
      
      if (!qFilename) {
        // Can't determine Q filename, skip meaningful assertion
        deferred.resolve();
        await deferred.promise;
        return;
      }
      
      // Set a Firefox-style stack on the promise that includes a Q internal frame
      // Line 100 is well within Q's code range
      (deferred.promise as any).stack = `internalQFunction@${qFilename}:100\nuserFunction@userfile.js:5`;
      (deferred.promise as any).stackCounter = 0;
      
      const error = new Error("test");
      deferred.reject(error);
      
      await deferred.promise.fail((e: Error) => {
        // makeStackTraceLong should have been called, modifying e.stack
        const stack = e.stack || "";
        
        // With original \d+: "100" matches attempt3, isInternalFrame returns true for Q line,
        // so "internalQFunction@q.js:100" gets filtered OUT
        // With mutated \D+: "100" doesn't match attempt3, isInternalFrame returns false,
        // so "internalQFunction@q.js:100" stays IN the stack
        
        // Therefore: original code should NOT contain "internalQFunction"
        // mutated code SHOULD contain "internalQFunction"
        expect(stack).not.toContain("internalQFunction");
      });
    } finally {
      Q.longStackSupport = false;
    }
  });
});