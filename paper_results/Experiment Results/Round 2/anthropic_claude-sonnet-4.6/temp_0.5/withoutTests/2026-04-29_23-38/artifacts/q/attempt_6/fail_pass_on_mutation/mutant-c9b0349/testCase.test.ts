import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("filtered stack has correct number of frames", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    let capturedError: any;
    
    const error = new Error("test");
    // Create a stack with many frames at line 1 (below qStartingLine)
    const frames = Array.from({length: 10}, (_, i) => `    at func${i} (x.js:1:1)`).join("\n");
    Object.defineProperty(error, "stack", {
      value: `Error: test\n${frames}`,
      writable: true,
      configurable: true,
    });
    
    const p = d.promise
      .then(() => { throw error; })
      .fail((e: any) => { capturedError = e; })
      .then(() => {
        const atLines = capturedError.stack.split("\n").filter((l: string) => l.includes("at func"));
        // Original: all 10 frames at line 1 < qStartingLine → all kept
        // Mutated: all 10 frames at line 1 <= qEndingLine → all filtered
        expect(atLines.length).toBe(10);
      });
    
    d.resolve();
    return p;
  });
});