import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 regex end anchor", () => {
  it("does not match stack lines with trailing content after column number", async () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    try {
      // Override Error.prepareStackTrace to produce stack lines with trailing content
      // Format: "    at /path/to/file.js:line:col [extra]"
      // With $ anchor (original): attempt2 won't match these lines
      // Without $ anchor (mutant): attempt2 will match these lines
      (Error as any).prepareStackTrace = function(_err: Error, frames: any[]) {
        return frames.map((frame: any) => {
          const file = frame.getFileName() || '<anonymous>';
          const line = frame.getLineNumber() || 0;
          const col = frame.getColumnNumber() || 0;
          return `    at ${file}:${line}:${col} [extra]`;
        }).join('\n');
      };
      
      // Re-import Q so that captureLine() runs with the new Error.prepareStackTrace
      jest.resetModules();
      const freshQ = (await import('../../../../../../../../../../../subject_repositories/q/q.js')).default;
      
      freshQ.longStackSupport = true;
      
      // Create a deferred - this captures promise.stack with Q frames
      const deferred = freshQ.defer();
      deferred.reject(new Error("test rejection"));
      
      const err = await deferred.promise.then(
        () => { throw new Error("Should not fulfill"); },
        (e: Error) => e
      );
      
      const stack = err.stack || "";
      
      // With original ($ anchor in attempt2):
      //   captureLine can't parse "[extra]" lines → qFileName = undefined
      //   isInternalFrame always returns false → no Q frame filtering
      //   promise.stack Q frames are preserved in error.stack
      //   → stack CONTAINS "q.js"
      //
      // With mutant (no $ anchor):
      //   captureLine parses "[extra]" lines → qFileName = Q's actual path
      //   isInternalFrame returns true for Q frames → Q frames filtered
      //   promise.stack Q frames are removed from error.stack
      //   → stack does NOT contain "q.js"
      expect(stack).toContain("q.js");
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }
  });
});