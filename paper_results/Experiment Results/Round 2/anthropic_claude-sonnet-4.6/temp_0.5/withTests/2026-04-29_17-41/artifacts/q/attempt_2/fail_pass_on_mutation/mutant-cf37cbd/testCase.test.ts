import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex", () => {
  it("should parse anonymous stack frames with multi-digit column numbers", (done) => {
    Q.longStackSupport = true;

    // Create a chain that will produce a long stack trace
    // The key is that Q's own frames have multi-digit column numbers
    // With the mutation, those frames won't be recognized as internal Q frames
    // and won't be filtered, causing them to appear in the output
    
    function outer() {
      return Q().then(function inner() {
        return Q.reject(new Error("boom"));
      });
    }

    outer().fail(function (err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      // With correct filtering, Q internal frames are removed
      // The stack should contain our user code (inner/outer) but not Q internals like "promiseDispatch"
      // With the mutation, Q frames with column >= 10 leak through
      const lines = stack.split("\n").filter((l: string) => l.trim().startsWith("at "));
      // All remaining frames should be user code, not Q.js internals
      const hasQInternals = lines.some((l: string) => 
        l.includes("promiseDispatch") || 
        l.includes("runSingle") ||
        l.includes("flush")
      );
      expect(hasQInternals).toBe(false);
      done();
    });
  });
});