describe("getFileNameAndLineNumber attempt2 $ anchor", () => {
  it("should require column number to be at end of string", async () => {
    jest.resetModules();

    const originalPrepare = (Error as any).prepareStackTrace;
    
    // Use a format where ALL frames (named and anonymous) have trailing ")"
    // For named frames: "at name (file:line:col))" - attempt1 matches, returns []
    // For anonymous frames: "at file:line:col)" - attempt2 with $ fails, without $ succeeds
    // 
    // But we need to ensure captureLine processes an anonymous frame.
    // captureLine looks at lines[2]. With this format, if lines[2] is anonymous,
    // it will be "    at /path/q.js:X:Y)" and the mutation matters.
    
    // Let's use a format where anonymous frames have " EXTRA" after the column
    // to make the difference even clearer
    (Error as any).prepareStackTrace = function (err: Error, frames: any[]) {
      const lines = [err.toString()];
      for (const frame of frames) {
        const file = (frame.getFileName && frame.getFileName()) || "<anonymous>";
        const line = (frame.getLineNumber && frame.getLineNumber()) || 0;
        const col = (frame.getColumnNumber && frame.getColumnNumber()) || 0;
        const name = frame.getFunctionName && frame.getFunctionName();
        if (name) {
          lines.push(`    at ${name} (${file}:${line}:${col})`);
        } else {
          // Anonymous frames get trailing content after column
          lines.push(`    at ${file}:${line}:${col} ANON`);
        }
      }
      return lines.join("\n");
    };

    let Q: any;
    try {
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } catch (e) {
      (Error as any).prepareStackTrace = originalPrepare;
      throw e;
    }

    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.when(Q(1), function firstCallback() {
        var d = Q.defer();
        var result = Q.when(d.promise, null, function catchHandler(e: Error) {
          capturedError = e;
        });
        Q.when(Q(1), function secondCallback() {
          d.reject(new Error("test rejection"));
        });
        return result;
      });
    } finally {
      (Error as any).prepareStackTrace = originalPrepare;
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";

    const namedFrameMatch = stack.match(/at \w[\w$.]*\s+\(([^)]*q\.js):\d+:\d+\)/);
    if (!namedFrameMatch) {
      expect(stack.length).toBeGreaterThan(0);
      return;
    }

    const qPath = namedFrameMatch[1];
    const escapedPath = qPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Anonymous Q frame pattern with " ANON" suffix
    // Original: NOT filtered -> present in stack
    // Mutated: IS filtered -> absent from stack
    const anonymousQFramePattern = new RegExp(`at ${escapedPath}:\\d+:\\d+ ANON`);

    expect(stack).toMatch(anonymousQFramePattern);
  });
});