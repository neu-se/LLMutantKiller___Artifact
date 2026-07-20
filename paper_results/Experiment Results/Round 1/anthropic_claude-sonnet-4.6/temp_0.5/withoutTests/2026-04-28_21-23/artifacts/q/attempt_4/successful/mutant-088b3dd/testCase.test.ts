import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt1 regex", () => {
  it("should handle named function stack frames for captureLine initialization", () => {
    // captureLine() is called at module load time
    // It throws an error and parses the stack to find Q's own file/line
    // The stack frame for captureLine itself is a named function frame:
    // "at captureLine (q.js:LINE:COL)"
    // attempt1 regex matches this; attempt2 does NOT (requires no space before colon)
    // With mutation (if false), captureLine returns undefined
    // This means qFileName = undefined, qStartingLine = undefined
    // isInternalFrame then always returns false
    // filterStackString then never filters Q internal frames
    
    // We can observe this: with longStackSupport, Q builds concatenated stacks
    // and filters them. If filtering fails, Q internal frames appear.
    
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    deferred.resolve(1);
    
    return deferred.promise
      .then(function step() {
        return Q.reject(new Error("test"));
      })
      .fail(function(err: Error) {
        Q.longStackSupport = false;
        const stack = err.stack || "";
        // "flush" is a Q internal function that should be filtered
        // In original: filtered out. In mutated: appears in stack.
        expect(stack).not.toContain("at flush");
        expect(stack).not.toContain("at runSingle");
      });
  });
});