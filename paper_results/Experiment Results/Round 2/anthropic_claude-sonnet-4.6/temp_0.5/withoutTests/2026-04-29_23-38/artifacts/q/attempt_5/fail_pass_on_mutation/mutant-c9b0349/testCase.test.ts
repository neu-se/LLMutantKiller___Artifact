import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("detects mutation in isInternalFrame", () => {
    Q.longStackSupport = true;
    
    // Get qEndingLine by checking what line numbers get filtered
    // The mutation removes the lower bound check (lineNumber >= qStartingLine)
    // So with mutation, frames at line 1 would be filtered (1 <= qEndingLine)
    // With original, frames at line 1 would NOT be filtered (1 < qStartingLine)
    
    const d = Q.defer();
    let err: any;
    
    // Force the error to be thrown with a known stack
    const syntheticError = new Error("test");
    // Manually craft a stack with a frame at line 1 (below qStartingLine ~88)
    // and a frame at a line > qEndingLine (~1800)
    Object.defineProperty(syntheticError, 'stack', {
      value: 'Error: test\n    at foo (q.js:1:1)\n    at bar (q.js:2000:1)',
      writable: true,
      configurable: true
    });
    
    const p = d.promise
      .then(() => { throw syntheticError; })
      .fail((e: any) => { err = e; })
      .then(() => {
        // With original: line 1 < qStartingLine → NOT filtered → "foo" in stack
        // With mutation: line 1 <= qEndingLine → filtered → "foo" NOT in stack
        // Line 2000 > qEndingLine → NOT filtered by either → "bar" in stack for both
        expect(err.stack).toContain("bar");    // both versions keep this
        expect(err.stack).toContain("foo");    // only original keeps this
      });
    
    d.resolve();
    return p;
  });
});