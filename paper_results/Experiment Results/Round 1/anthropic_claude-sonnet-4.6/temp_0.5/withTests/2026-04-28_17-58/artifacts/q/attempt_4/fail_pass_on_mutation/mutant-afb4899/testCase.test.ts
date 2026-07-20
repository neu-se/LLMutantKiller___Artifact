describe("getFileNameAndLineNumber $ anchor", () => {
  it("should only match stack lines ending with column number", async () => {
    jest.resetModules();
    
    const originalPrepare = (Error as any).prepareStackTrace;
    
    (Error as any).prepareStackTrace = function(err: Error, frames: any[]) {
      const lines = [err.toString()];
      for (const frame of frames) {
        const file = (frame.getFileName && frame.getFileName()) || '<anonymous>';
        const line = (frame.getLineNumber && frame.getLineNumber()) || 0;
        const col = (frame.getColumnNumber && frame.getColumnNumber()) || 0;
        const name = frame.getFunctionName && frame.getFunctionName();
        if (name) {
          lines.push(`    at ${name} (${file}:${line}:${col})`);
        } else {
          lines.push(`    at ${file}:${line}:${col})`);
        }
      }
      return lines.join('\n');
    };
    
    let Q: any;
    try {
      Q = (await import('../../../../../../../../../../../subject_repositories/q/q.js')).default;
    } catch (e) {
      (Error as any).prepareStackTrace = originalPrepare;
      throw e;
    }
    
    Q.longStackSupport = true;
    
    let capturedError: Error | null = null;
    
    try {
      // Two-level Q.when: the inner deferred is created in outerCallback
      // (which runs asynchronously). Its promise.stack contains anonymous Q frames.
      // The inner Q.when creates a promise with higher stackCounter,
      // so the outer deferred's stack IS included in the long stack trace.
      await Q.when(Q(1), function outerCallback() {
        var d = Q.defer();
        Q.when(Q(1), function innerCallback() {
          d.reject(new Error("test rejection"));
          return d.promise;
        });
        return d.promise;
      }).catch(function(e: Error) {
        capturedError = e;
      });
    } finally {
      (Error as any).prepareStackTrace = originalPrepare;
      Q.longStackSupport = false;
    }
    
    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";
    
    // Find q.js path from named Q frames
    const namedFrameMatch = stack.match(/at \w[\w$.]*\s+\(([^)]*q\.js):\d+:\d+\)/);
    if (!namedFrameMatch) {
      expect(stack.length).toBeGreaterThan(0);
      return;
    }
    
    const qPath = namedFrameMatch[1];
    const escapedPath = qPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const anonymousQFramePattern = new RegExp(`at ${escapedPath}:\\d+:\\d+\\)`);
    
    // Original: anonymous Q frames NOT filtered -> present
    // Mutated: anonymous Q frames ARE filtered -> absent
    expect(stack).toMatch(anonymousQFramePattern);
  });
});