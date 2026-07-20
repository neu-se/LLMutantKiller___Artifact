import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber with multi-digit line numbers", () => {
  it("parses anonymous stack frames with multi-digit line numbers for long stack support", async () => {
    Q.longStackSupport = true;

    try {
      // Create a chain that will produce long stack traces
      // The key is that makeStackTraceLong calls filterStackString which calls isInternalFrame
      // which calls getFileNameAndLineNumber. If attempt2 can't parse multi-digit line numbers,
      // Q's own frames won't be recognized as internal and will appear in the filtered stack.
      
      const p1 = Q.defer();
      
      const resultStack = await new Promise<string>((resolve) => {
        p1.promise
          .then(() => Q.reject(new Error("chained error")))
          .fail((err: Error) => {
            resolve(err.stack || "");
          });
      });
      
      p1.resolve();
      
      // With original: Q internal frames filtered, stack is shorter / cleaner
      // With mutant: Q internal frames NOT filtered, stack contains Q internals
      const lines = resultStack.split("\n").filter(l => l.trim().startsWith("at "));
      // There should be no Q internal frames like "runSingle", "flush", "nextTick"
      const hasQInternals = lines.some(l => 
        l.includes("runSingle") || l.includes("flush") || 
        l.includes("nextTick") || l.includes("promiseDispatch")
      );
      expect(hasQInternals).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});