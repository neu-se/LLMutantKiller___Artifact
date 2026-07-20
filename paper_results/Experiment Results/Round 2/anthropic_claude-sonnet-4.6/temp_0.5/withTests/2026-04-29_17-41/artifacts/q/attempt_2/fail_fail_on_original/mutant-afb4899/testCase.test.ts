describe("getFileNameAndLineNumber attempt2 regex end anchor", () => {
  it("uses $ anchor to prevent matching lines with trailing content", async () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    try {
      (Error as any).prepareStackTrace = function(_err: Error, frames: any[]) {
        return frames.map((frame: any) => {
          const file = frame.getFileName() || '<anonymous>';
          const line = frame.getLineNumber() || 0;
          const col = frame.getColumnNumber() || 0;
          return `    at ${file}:${line}:${col} [extra]`;
        }).join('\n');
      };
      
      jest.resetModules();
      const freshQ = (await import('../../../../../../../../../../subject_repositories/q/q.js')).default;
      
      freshQ.longStackSupport = true;
      
      // Create a deferred INSIDE a Q callback so that promise.stack contains Q frames
      const outerDeferred = freshQ.defer();
      
      freshQ.when(freshQ(), function() {
        // We're now inside Q's event loop - stack has multiple Q frames
        const innerDeferred = freshQ.defer();
        // promise.stack here has Q frames (after removing the first defer frame)
        innerDeferred.reject(new Error("test rejection"));
        return innerDeferred.promise;
      }).then(null, function(err: Error) {
        outerDeferred.resolve(err);
      });
      
      const err = await new Promise<Error>((resolve, reject) => {
        outerDeferred.promise.then(
          (e: Error) => resolve(e),
          (e: Error) => reject(e)
        );
      });
      
      const stack = err.stack || "";
      
      // With original ($ in attempt2):
      //   captureLine can't parse "[extra]" lines → qFileName = undefined
      //   isInternalFrame always false → no filtering
      //   promise.stack Q frames preserved → stack contains "q.js"
      //
      // With mutant (no $ in attempt2):
      //   captureLine parses "[extra]" lines → qFileName = Q's path
      //   isInternalFrame true for Q frames → Q frames filtered
      //   promise.stack Q frames removed → stack does NOT contain "q.js"
      expect(stack).toContain("q.js");
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }
  });
});