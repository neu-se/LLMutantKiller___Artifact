import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex", () => {
  it("correctly parses stack frames with multi-digit line numbers for captureLine", async () => {
    // captureLine() is called at module load time to set qStartingLine/qEndingLine
    // With original regex (\d+): multi-digit line numbers parse correctly
    // With mutated regex (\d): only single-digit line numbers parse, so
    // captureLine() returns undefined for q.js (which has lines > 9)
    // This means qStartingLine = undefined, qEndingLine = undefined
    
    // We can observe this by checking Q.nextTick behavior with long stacks:
    // When qStartingLine is properly set, filterStackString removes Q internal frames
    // When qStartingLine is undefined, ALL frames including Q internals remain
    
    Q.longStackSupport = true;
    
    try {
      let errorStack = "";
      
      await new Promise<void>((resolve) => {
        // Create a chain that will produce a long stack trace
        Q.fcall(function level1() {
          return Q.fcall(function level2() {
            throw new Error("test");
          });
        }).fail(function(err: Error) {
          errorStack = err.stack || "";
          resolve();
        });
      });
      
      // Count lines in the filtered stack
      // With original: Q internal frames filtered out -> fewer lines, no Q internals
      // With mutated: Q internal frames NOT filtered -> many more lines with Q internals
      const lines = errorStack.split("\n").filter((l: string) => l.trim().startsWith("at "));
      
      // With proper filtering, internal Q frames like "flush", "runSingle", 
      // "nextTick" should be absent
      const hasFlushFrame = lines.some((l: string) => l.includes("flush") && l.includes("q.js"));
      const hasRunSingleFrame = lines.some((l: string) => l.includes("runSingle") && l.includes("q.js"));
      
      expect(hasFlushFrame).toBe(false);
      expect(hasRunSingleFrame).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});