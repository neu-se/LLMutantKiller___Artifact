import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 regex with multi-digit column", () => {
  it("correctly parses anonymous frames with multi-digit column numbers", async () => {
    Q.longStackSupport = true;
    
    // We need to test that attempt2 regex works for multi-digit columns.
    // We do this by checking that filterStackString correctly handles
    // a stack line in attempt2 format with a multi-digit column.
    
    // The key: if attempt2 fails for multi-digit columns, then
    // getFileNameAndLineNumber returns undefined for those lines,
    // isInternalFrame returns false, and those lines are NOT filtered.
    
    // To test this, we need a stack line from q.js in attempt2 format
    // with a multi-digit column. We can create this by overriding
    // Error.prepareStackTrace.
    
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    try {
      // Override prepareStackTrace to inject a specific stack format
      // that includes an anonymous q.js frame with multi-digit column
      let qFilePath: string | undefined;
      
      // First, get the q.js file path by creating a Q promise and
      // examining its stack
      const d = Q.defer();
      const promiseStack = (d.promise as any).stack || "";
      
      // Extract q.js path from promise.stack
      const match = promiseStack.match(/at defer \((.+):\d+:\d+\)/);
      if (match) {
        qFilePath = match[1];
      }
      
      if (!qFilePath) {
        // Can't determine q.js path, skip test
        return;
      }
      
      // Now create a test where we know an anonymous q.js frame
      // with multi-digit column appears
      // We'll override prepareStackTrace to inject such a frame
      (Error as any).prepareStackTrace = function(err: any, frames: any[]) {
        // Create a stack string that includes an anonymous q.js frame
        // with column number 15 (two digits)
        const lines = [`Error: ${err.message}`];
        for (const frame of frames) {
          const fn = frame.getFunctionName();
          const file = frame.getFileName();
          const line = frame.getLineNumber();
          const col = frame.getColumnNumber();
          if (fn) {
            lines.push(`    at ${fn} (${file}:${line}:${col})`);
          } else {
            lines.push(`    at ${file}:${line}:${col}`);
          }
        }
        // Inject an anonymous q.js frame with multi-digit column
        lines.splice(2, 0, `    at ${qFilePath}:100:15`);
        return lines.join("\n");
      };
      
      let capturedErr: Error | null = null;
      
      await Q()
        .then(function userCallback() {
          throw new Error("test");
        })
        .catch((e: Error) => {
          capturedErr = e;
        });
      
      expect(capturedErr).not.toBeNull();
      const stack = capturedErr!.stack!;
      
      // The injected frame "at q.js:100:15" should be filtered (original)
      // or not filtered (mutant)
      // With original: attempt2 matches "at q.js:100:15", isInternalFrame
      //   checks if line 100 is in q.js range, if yes, filters it
      // With mutant: attempt2 fails for column 15 (two digits), 
      //   getFileNameAndLineNumber returns undefined, isInternalFrame returns false,
      //   frame is NOT filtered
      
      // Check if the injected frame appears in the filtered stack
      expect(stack).not.toContain(`${qFilePath}:100:15`);
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
      Q.longStackSupport = false;
    }
  });
});