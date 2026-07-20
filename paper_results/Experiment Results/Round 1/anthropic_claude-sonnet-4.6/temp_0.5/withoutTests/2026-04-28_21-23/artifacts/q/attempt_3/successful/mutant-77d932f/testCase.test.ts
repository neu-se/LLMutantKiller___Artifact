import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should parse stack lines to enable filtering of Q internal frames in long stack traces", async () => {
    const saved = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a deferred to capture the promise's stack
      const deferred = Q.defer();
      
      // The deferred.promise.stack is set when longStackSupport=true
      // It contains lines from q.js (the defer() call site is in q.js)
      // With original: these lines get filtered by isInternalFrame
      // With mutation: these lines are NOT filtered
      
      const errorStack = await new Promise<string>((resolve) => {
        deferred.promise.fail(function(err: Error) {
          resolve(err.stack || "");
        });
        
        Q.nextTick(function() {
          deferred.reject(new Error("test"));
        });
      });

      // The promise.stack contains q.js frames
      // makeStackTraceLong concatenates error.stack with promise.stack
      // filterStackString removes isInternalFrame lines
      // With original: q.js frames removed from the concatenated result
      // With mutation: q.js frames remain
      
      const lines = errorStack.split("\n");
      const qJsAtLines = lines.filter(l => l.trim().startsWith("at ") && l.includes("q.js"));
      
      expect(qJsAtLines.length).toBe(0);
    } finally {
      Q.longStackSupport = saved;
    }
  });
});