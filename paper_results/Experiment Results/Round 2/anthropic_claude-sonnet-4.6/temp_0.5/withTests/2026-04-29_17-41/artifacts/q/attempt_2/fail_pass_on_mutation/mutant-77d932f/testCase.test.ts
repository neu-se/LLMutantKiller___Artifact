import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("captureLine uses getFileNameAndLineNumber so qStartingLine must be set for internal frame filtering to work", async () => {
    Q.longStackSupport = true;

    try {
      // We create a promise chain that will have a long stack trace.
      // The key insight: with original code, getFileNameAndLineNumber parses
      // stack lines correctly, so captureLine() returns a valid line number,
      // qFileName is set to q.js's filename, and isInternalFrame filters
      // Q's own lines from stack traces.
      //
      // With mutated code, getFileNameAndLineNumber returns undefined always,
      // captureLine() returns undefined, qFileName stays undefined,
      // and isInternalFrame always returns false.
      //
      // filterStackString filters lines where isInternalFrame OR isNodeFrame is true.
      // With mutation, only isNodeFrame filtering applies.
      // Q's own implementation frames (flush, runSingle, etc.) will appear
      // in the "From previous event:" section.

      let errorStack = "";

      function myUserFunction(): Q.Promise<never> {
        const d = Q.defer<never>();
        Q.nextTick(function myNextTickCallback() {
          d.reject(new Error("test rejection"));
        });
        return d.promise;
      }

      await new Promise<void>((resolve) => {
        myUserFunction().then(null, (err: Error) => {
          errorStack = err.stack || "";
          resolve();
        });
      });

      expect(errorStack).toContain("From previous event:");

      // Count lines in the "From previous event:" section
      const afterSeparator = errorStack.split("From previous event:").slice(1).join("");
      const lines = afterSeparator.split("\n").filter(l => l.trim().length > 0);

      // In the original, Q internal frames are filtered out, leaving only
      // user-visible frames. In the mutated version, Q internal frames remain,
      // making the stack significantly longer.
      // 
      // With original: the "From previous event:" section should be short
      // (just the user call site lines, Q internals filtered)
      // With mutation: Q internals like flush(), runSingle(), process.nextTick
      // callbacks all appear, making it much longer
      //
      // A reliable check: in original, Q's own frames are absent.
      // We check that none of the lines reference the internal "flush" or 
      // "runSingle" functions that are defined inside q.js
      const hasQInternalFrames = lines.some(line => 
        line.includes("runSingle") || line.includes("at flush")
      );

      // Original: false (Q internals filtered). Mutated: true (not filtered).
      expect(hasQInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = false;
    }
  });
});