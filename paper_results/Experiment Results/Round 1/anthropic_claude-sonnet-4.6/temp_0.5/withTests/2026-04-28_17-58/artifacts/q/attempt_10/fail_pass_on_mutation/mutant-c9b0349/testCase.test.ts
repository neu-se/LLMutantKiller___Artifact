import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound", () => {
  it("detects mutation via qStartingLine lower bound removal", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    // Access promise.stack directly - it contains raw q.js frames
    const promiseStack: string = (d.promise as any).stack || "";
    Q.longStackSupport = false;
    
    // The promise stack should contain q.js frames
    // These frames are at lines within [qStartingLine, qEndingLine]
    // With original: isInternalFrame returns true for these (they get filtered in makeStackTraceLong)
    // With mutated: isInternalFrame also returns true (same result - no difference here)
    
    // But wait - what about the CALLER frames in promise.stack?
    // promise.stack includes the frame where Q.defer() was called (this test file, line ~6)
    // With original: line 6 < qStartingLine (~86) -> NOT filtered
    // With mutated: line 6 <= qEndingLine (~1700) -> filtered
    
    // Let's verify promise.stack contains this test file's frame
    expect(promiseStack).toContain("testCase.test.ts");
    
    // Now test that makeStackTraceLong filters it correctly
    const p = d.promise.then(null, (err: Error) => {
      const stack = err.stack || "";
      // With original: testCase.test.ts frame at line ~6 survives (< qStartingLine)
      // With mutated: testCase.test.ts frame at line ~6 is filtered (<= qEndingLine)
      expect(stack).toContain("testCase.test.ts");
    });
    d.reject(new Error("test"));
    return p;
  });
});