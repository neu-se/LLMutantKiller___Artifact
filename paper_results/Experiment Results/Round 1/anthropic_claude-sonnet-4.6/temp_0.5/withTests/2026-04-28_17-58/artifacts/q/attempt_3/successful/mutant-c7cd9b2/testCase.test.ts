import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 branch", () => {
  it("correctly parses anonymous-style stack lines for internal frame filtering", async () => {
    Q.longStackSupport = true;
    
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    try {
      // Force stack frames to use attempt2 format (no function name, single digit col)
      // This tests whether getFileNameAndLineNumber's attempt2 branch works
      (Error as any).prepareStackTrace = (err: Error, frames: any[]) => {
        const lines = [String(err)];
        for (const frame of frames) {
          const file = frame.getFileName() || "<anonymous>";
          const line = frame.getLineNumber() || 0;
          const col = (frame.getColumnNumber() || 0) % 10; // ensure single digit
          // Always use attempt2 format: no function name, no parens
          lines.push(`    at ${file}:${line}:${col}`);
        }
        return lines.join("\n");
      };

      const err = await Q.fcall((): never => {
        throw new Error("test error");
      }).then(null, (e: Error) => e);

      const stack = err.stack as string;
      const frameLines = stack.split("\n").filter((line: string) => 
        line.trim().startsWith("at ")
      );
      
      // With original code: attempt2 branch parses these lines correctly
      // isInternalFrame identifies q.js frames and filters them
      // Result: no q.js frames in the output
      //
      // With mutation (if false): attempt2 branch never executes
      // getFileNameAndLineNumber returns undefined for these lines
      // isInternalFrame returns false (can't identify as internal)
      // Result: q.js frames appear in the output
      const qFrames = frameLines.filter((line: string) => /\bq\.js\b/.test(line));
      expect(qFrames.length).toBe(0);
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
      Q.longStackSupport = false;
    }
  });
});