import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack frame filtering via getFileNameAndLineNumber", () => {
  it("should filter Q internal frames so that filterStackString removes q.js lines", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a chain that will produce a long stack trace
      await Q.fcall(function thrower() {
        throw new Error("test");
      }).fail(function(err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";

      // With original code: getFileNameAndLineNumber correctly parses named
      // function frames, so captureLine() sets qFileName to q.js path and
      // qStartingLine/qEndingLine are set. isInternalFrame() then correctly
      // identifies and filters out Q's own stack frames.
      // Result: no lines from q.js appear in the filtered stack.
      //
      // With mutated code: getFileNameAndLineNumber returns undefined for
      // named function frames (which is what captureLine() encounters),
      // so qFileName is never set. isInternalFrame() always returns false.
      // Result: Q's own stack frames (from q.js) remain in the filtered stack.
      
      // Check that no q.js internal frames appear in the stack
      // (they should be filtered out by the original code)
      const lines = stack.split("\n");
      const qInternalLines = lines.filter(line => 
        line.includes("q.js") && !line.includes("testCase.test")
      );
      
      expect(qInternalLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});