import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("reveals mutation by checking promise stack concatenation includes q.js frames", async () => {
    Q.longStackSupport = true;

    let err: any = null;

    // The promise.stack captured in defer() contains Q's own frames
    // isInternalFrame should filter these in original but not in mutated
    // Let's capture both the error stack and check if q.js frames appear
    
    await Q.fcall(() => { throw new Error("test"); })
      .fail((e: any) => { err = e; });

    Q.longStackSupport = false;

    expect(err).not.toBeNull();
    const stack: string = err.stack || "";
    
    // The promise.stack (set in defer) contains frames from q.js
    // In original: isInternalFrame filters these q.js frames from the concatenated stack
    // In mutated: these q.js frames are kept
    
    // Count lines containing q.js in stack frames
    const stackLines = stack.split("\n");
    const qFrames = stackLines.filter((l: string) => 
      l.trim().startsWith("at ") && l.includes("q.js")
    );
    
    // Original: q.js internal frames filtered -> 0 q.js frames (or very few)
    // Mutated: q.js frames kept -> many q.js frames
    // From previous test we know original gives 15 "at" lines total
    // If none are from q.js in original, that's our signal
    
    // But we need to know what the mutated version gives...
    // Let's assert that q.js frames are NOT present (original behavior)
    // If mutated keeps them, this assertion fails
    expect(qFrames.length).toBe(0);
  });
});