import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("long stack trace line count should differ between filtered and unfiltered", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    // Create a deep chain to maximize Q internal frames in the stack
    function step() {
      return Q.fcall(() => {
        throw new Error("test error");
      });
    }

    await step()
      .then(() => "ok")
      .fail((e: any) => { caughtError = e; });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const filteredStack: string = caughtError.stack || "";
    expect(filteredStack.length).toBeGreaterThan(0);

    // Now get the raw (unfiltered) stack by creating a similar error without Q processing
    // The filtered stack should have FEWER lines than the raw concatenated stack
    // because isInternalFrame removes Q's own frames
    
    // In original: Q internal frames removed -> stack has fewer "at q.js" lines
    // In mutated: all frames kept -> stack has more lines
    
    // Count lines that reference q.js with line numbers in Q's range
    // isInternalFrame checks: fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine
    // These are lines like "at Object.<anonymous> (/path/to/q.js:500:10)"
    // Original removes these; mutated keeps them
    
    // We need to know if ANY q.js internal lines exist in the filtered stack
    // In the original they should be removed; in mutated they should remain
    
    // Get the stack before Q processes it by checking the raw error
    const rawError = new Error("raw");
    const rawStack = rawError.stack || "";
    
    // The filtered stack (after Q processing) should have fewer or equal lines
    // than if we just concatenated raw stacks
    // Key insight: filtered stack line count < (raw stack line count * number of promises in chain)
    const filteredLineCount = filteredStack.split("\n").filter((l: string) => l.trim().startsWith("at ")).length;
    const rawLineCount = rawStack.split("\n").filter((l: string) => l.trim().startsWith("at ")).length;
    
    // Original: internal Q frames filtered -> filteredLineCount <= rawLineCount  
    // Mutated: all frames kept -> filteredLineCount > rawLineCount (more frames from Q internals)
    expect(filteredLineCount).toBeLessThanOrEqual(rawLineCount);
  });
});